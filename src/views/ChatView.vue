<script lang="ts" setup>
import { onMounted, ref, type Ref, watch } from 'vue'
import ChatHeader from '@/components/layout/ChatHeader.vue'
import type { Message } from '@/pojo/message'
import type { Contact } from '@/pojo/contact'
import request from '@/utils/request'

const isSidebarCollapsed = ref(true)
const isCardVisible = ref(false) // 新增响应式变量控制卡片显示
const isLoading = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// 聊天用户名
const chatUserName = ref()

const searchVal = ref('')

const contactList: Ref<Contact[]> = ref([])
const getContactList = async (): Promise<void> => {
  isLoading.value = true
  await request({
    url: '/contact',
    method: 'GET',
  }).then((res) => {
    if (res.data.code === 200) {
      contactList.value = res.data.data
      isLoading.value = false
    } else {
      console.log('获取联系人列表失败')
      ElMessage.error('获取联系人列表失败')
    }
  })
}

// 切换聊天用户
const activeIndex = ref<number | null>(null)
const switchContact = (index: number): void => {
  isLoading.value = true
  activeIndex.value = index
  chatUserName.value = contactList.value[index].username
  // 获取聊天信息
  // 先清除，再获取
  messages.value = []
  create_socket(contactList.value[index].roomId)
  getChatMessages(contactList.value[index].id)
}

// 删除联系人
const deleteContact = async (id: number): Promise<void> => {
  await request({
    url: `/contact/${id}`,
    method: 'DELETE',
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success('删除成功!')
    }
    getContactList()
  })
}

// 聊天消息
// 当前聊天消息
const message = ref('')
const messages: Ref<Message[]> = ref([])
const getChatMessages = async (id: number): Promise<void> => {
  // 获取聊天消息
  await request({
    url: `/message/${id}`,
    method: 'GET',
  }).then((res) => {
    messages.value = res.data.data
    isLoading.value = false
  })
}

// 发送消息
// 消息类型
const messageType = ref('')

async function sendMessage(): Promise<void> {
  if (activeIndex.value === null) {
    ElMessage.error('没有选择联系人!')
    return
  }
  if (message.value.trim() === '') {
    ElMessage.error('回复内容为空!')
    return
  }

  messageType.value = 'sent'
  webSocket.send(message.value)
  const msg = message.value
  message.value = ''
  await request({
    url: '/message',
    method: 'POST',
    data: {
      id: contactList.value[activeIndex.value].id,
      content: msg,
    },
  }).then(() => {
    getChatMessages(contactList.value[activeIndex.value!].id)
  })
}

// socket服务
let socketUrl: string = import.meta.env.VITE_APP_BASESOCKET
let webSocket: WebSocket

// 创建socket服务
function create_socket(roomId: number) {
  socketUrl = import.meta.env.VITE_APP_BASESOCKET + roomId
  webSocket = new WebSocket(socketUrl)
  webSocket.onopen = function () {
    console.log('WebSocket连接成功')
  }
  webSocket.onmessage = function (ev) {
    // alert(ev.data)
    messages.value.push(<Message>{
      content: ev.data,
      date: new Date().toString(),
      id: messages.value.length + 1,
      type: messageType.value === '' ? 'received' : messageType,
    })
  }
}

// 添加好友
const friendName = ref('')
async function addFriend(): Promise<void> {
  await request({
    url: `/contact/username/${friendName.value}`,
    method: "POST",
  }).then(() => {
    ElMessage.success('添加成功!')
    isCardVisible.value = false
    getContactList()
  })
}

onMounted(() => {
  const isMobile = window.innerWidth <= 768
  if (isMobile) {
    isSidebarCollapsed.value = true
  }

  // 获取联系人列表
  getContactList()

  // 监听搜索栏
  watch(searchVal, (newVal) => {
    if (newVal === '') {
      getContactList()
    } else {
      contactList.value = contactList.value.filter((contact) => {
        return contact.username.includes(newVal)
      })
    }
  })
})
</script>

<template>
  <!--  弹层  -->
  <div v-if="isCardVisible" class="card">
    <div class="card2">
      <form @submit.prevent="addFriend" class="form">
        <p id="heading">添加好友</p>
        <div class="field">
          <svg
            class="input-icon"
            fill="currentColor"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
            ></path>
          </svg>
          <input v-model="friendName" autocomplete="off" class="input-field" placeholder="请输入好友名称" type="text" />
        </div>
<!--        <div class="field">-->
<!--          <svg-->
<!--            class="input-icon"-->
<!--            fill="currentColor"-->
<!--            height="16"-->
<!--            viewBox="0 0 16 16"-->
<!--            width="16"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--          >-->
<!--            <path-->
<!--              d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"-->
<!--            ></path>-->
<!--          </svg>-->
<!--          <input class="input-field" placeholder="请输入验证消息" type="text" />-->
<!--        </div>-->
        <div class="btn">
          <button class="button1">发送请求</button>
          <button class="button2" @click="isCardVisible = false">取消</button>
        </div>
      </form>
    </div>
  </div>

  <chat-header
    :chat-user-name="chatUserName"
    :class="{ blurred: isCardVisible, 'no-pointer-events': isCardVisible }"
    @toggle-sidebar="toggleSidebar"
  />
  <div
    v-loading="isLoading"
    :class="{ blurred: isCardVisible, 'no-pointer-events': isCardVisible }"
    class="container"
  >
    <aside :class="{ sidebar: true, collapsed: isSidebarCollapsed }">
      <div class="searchbar">
        <svg
          class="icon"
          data-darkreader-inline-fill=""
          height="24"
          p-id="4173"
          t="1737636062235"
          version="1.1"
          viewBox="0 0 1024 1024"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          @click="isCardVisible = true"
        >
          <path
            d="M512 958.016611c-119.648434 0-232.1288-46.367961-316.736783-130.559656-84.640667-84.255342-131.263217-196.255772-131.263217-315.455235 0-119.168499 46.624271-231.199892 131.232254-315.424271 84.607983-84.191695 197.088348-130.559656 316.736783-130.559656s232.1288 46.367961 316.704099 130.559656c84.67163 84.224378 131.263217 196.255772 131.263217 315.391587 0.032684 119.199462-46.591587 231.232576-131.263217 315.455235C744.1288 911.615966 631.648434 958.016611 512 958.016611zM512 129.983389c-102.623626 0-199.071738 39.743475-271.583282 111.936783-72.480581 72.12794-112.416718 168.063432-112.416718 270.079828s39.903454 197.951888 112.384034 270.047144c72.511544 72.191587 168.959656 111.936783 271.583282 111.936783 102.592662 0 199.071738-39.743475 271.583282-111.936783 72.480581-72.160624 112.416718-168.063432 112.384034-270.079828 0-102.016396-39.903454-197.919204-112.384034-270.016181C711.071738 169.759548 614.592662 129.983389 512 129.983389z"
            data-darkreader-inline-fill=""
            fill="#575B66"
            p-id="4174"
          ></path>
          <path
            d="M736.00086 480.00086 544.00086 480.00086 544.00086 288.00086c0-17.664722-14.336138-32.00086-32.00086-32.00086s-32.00086 14.336138-32.00086 32.00086l0 192L288.00086 480.00086c-17.664722 0-32.00086 14.336138-32.00086 32.00086s14.336138 32.00086 32.00086 32.00086l192 0 0 192c0 17.695686 14.336138 32.00086 32.00086 32.00086s32.00086-14.303454 32.00086-32.00086L544.00258 544.00086l192 0c17.695686 0 32.00086-14.336138 32.00086-32.00086S753.696546 480.00086 736.00086 480.00086z"
            data-darkreader-inline-fill=""
            fill="#575B66"
            p-id="4175"
          ></path>
        </svg>
        <input v-model="searchVal" placeholder="搜索..." type="text" />
        <button>
          <svg
            fill="none"
            height="24"
            stroke="#666"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
          </svg>
        </button>
      </div>
      <div style="margin: 10px"></div>
      <div
        v-for="(item, index) in contactList"
        :key="index"
        :class="{ active: activeIndex === index }"
        class="contact"
      >
        <i class="fas fa-user-circle"></i>
        <span @click="switchContact(index)">{{ item.username }}</span>
        <div class="del_contact">
          <el-popconfirm title="是否要删除该好友?" @confirm="deleteContact(item.id)">
            <template #reference>
              <svg
                class="icon"
                data-darkreader-inline-fill=""
                height="200"
                p-id="5396"
                t="1743085123427"
                version="1.1"
                viewBox="0 0 1024 1024"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0h1024v1024H0z"
                  data-darkreader-inline-fill=""
                  fill="#FFFFFF"
                  fill-opacity=".01"
                  p-id="5397"
                  style="--darkreader-inline-fill: var(--darkreader-background-ffffff, #17191a)"
                ></path>
                <path
                  d="M405.44 458.56a181.44 181.44 0 1 1-0.64-362.88 181.44 181.44 0 0 1 0.64 362.88z m0-298.56a117.44 117.44 0 1 0-0.64 234.88A117.44 117.44 0 0 0 405.44 160zM874.56 864a32 32 0 0 1-22.4-9.28l-170.88-170.88a32 32 0 1 1 45.44-45.12l170.56 170.56a32 32 0 0 1-22.72 54.72z"
                  data-darkreader-inline-fill=""
                  fill="#909399"
                  p-id="5398"
                  style="--darkreader-inline-fill: var(--darkreader-background-909399, #50565a)"
                ></path>
                <path
                  d="M704 864a32 32 0 0 1-22.72-54.72l170.88-170.56a32 32 0 1 1 45.12 45.12l-170.56 170.88A32 32 0 0 1 704 864zM576 928H128a32 32 0 0 1-32-32v-25.6c0-100.48 0-151.04 22.08-194.56a200.32 200.32 0 0 1 88.64-88.32c43.2-22.08 93.76-22.08 194.24-22.08H576a32 32 0 0 1 0 64h-175.04c-90.24 0-135.68 0-165.12 15.04a138.88 138.88 0 0 0-60.8 60.48c-14.72 29.12-15.04 72.96-15.04 160h416a32 32 0 0 1 0 64V928z"
                  data-darkreader-inline-fill=""
                  fill="#909399"
                  p-id="5399"
                  style="--darkreader-inline-fill: var(--darkreader-background-909399, #50565a)"
                ></path>
              </svg>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </aside>
    <main class="main">
      <section class="chat-area">
        <div v-for="item in messages" :key="item.id" :class="item.type" class="message">
          {{ item.content }}
        </div>
      </section>
      <footer class="input-area">
        <input
          v-model="message"
          :disabled="isLoading"
          placeholder="输入消息..."
          type="text"
          @keydown.enter="sendMessage"
        />
        <button @click="sendMessage"><i class="fas fa-paper-plane"></i></button>
      </footer>
    </main>
  </div>
</template>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  height: 100%;
}

.container {
  display: flex;
  transition: filter 0.5s ease;
  height: calc(100vh - 60px); /* 保持总高度不变 */
}

.container .chat-area {
  margin-top: 60px; /* 根据header实际高度调整 */
}

.sidebar {
  width: 250px;
  background-color: var(--color-background);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed; /* 改为固定定位 */
  left: 0;
  top: 60px; /* 与header高度一致 */
  margin-top: 0; /* 移除原有margin-top */
  height: calc(100vh - 60px);
  z-index: 50; /* 低于 header 的 z-index */
}

.sidebar.collapsed {
  width: 0;
  padding: 0;
  overflow: hidden;
}

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: calc(100% - 250px);
  height: 100vh;
}

.chat-area {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: var(--color-background-soft);
  display: flex;
  flex-direction: column;
}

.input-area {
  position: sticky; /* 使用粘性定位 */
  bottom: 0; /* 固定在底部 */
  background-color: var(--color-background-mute);
  border-top: 1px solid var(--color-text);
  display: flex;
  align-items: center;
  padding: 20px;
  z-index: 10; /* 确保在内容上方 */
}

.contact {
  margin-bottom: 10px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: font-weight 0.3s ease; /* 添加过渡效果，使颜色变化更平滑 */
}

.contact > span:hover {
  color: var(--color-active);
  font-weight: bold;
}

.contact i {
  margin-right: 10px;
}

.active {
  font-weight: bold;
  color: var(--color-active);
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  max-width: 70%;
}

.received {
  background-color: var(--color-background-mute);
  align-self: flex-start;
}

.sent {
  background-color: #9eea6a;
  color: #000000;
  align-self: flex-end;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  /*
  border: 1px solid #ddd;
  */
  border-radius: 5px;
}

.input-area button {
  background: none;
  border: none;
  font-size: 1.5em;
  color: #0080ff;
  cursor: pointer;
  margin-left: 10px;
}

.input-area input {
  width: 100%;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

.searchbar {
  position: relative;
  width: 100%;
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 图标和输入框之间的间距 */
}

.searchbar .icon {
  position: absolute; /* 绝对定位 */
  left: 0; /* 离左侧距离 */
  z-index: 1; /* 确保图标在输入框上层 */
}

.searchbar input {
  width: 100%;
  margin-left: 35px;
  margin-right: 10px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

.searchbar input:focus {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

.searchbar button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.searchbar button svg {
  stroke: var(--color-active);
  transition: stroke 0.5s ease; /* 添加过渡效果，使颜色变化更平滑 */
}

.searchbar button svg:hover {
  stroke: var(--color-text);
}

/* 正常状态下将变量应用到 SVG 的路径填充颜色 */
.icon path {
  fill: var(--color-active);
  transition: fill 0.3s ease; /* 添加过渡效果，使颜色变化更平滑 */
}

.form .btn {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2.5em;
  padding-left: 0.8em;
  padding-right: 0.8em;
}

/* 媒体查询，当屏幕宽度小于 768px 时，侧边栏默认折叠 */
@media (max-width: 768px) {
  .sidebar {
    top: 60px; /* 保持与header的间距 */
    bottom: auto; /* 移除原有bottom定位 */
    height: calc(100vh - 60px);
    width: 0;
    padding: 0;
    overflow: hidden;
    position: fixed;
    left: 0;
  }

  .sidebar:not(.collapsed) {
    transition:
      width 0.3s ease,
      top 0.3s ease;
    width: 250px;
  }

  .form .btn {
    padding-left: 0.3em;
    padding-right: 0.3em;
  }

  .form .btn button {
    font-size: 0.8em;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 0.8em;
  padding-right: 0.8em;
  padding-bottom: 0.4em;
  background-color: var(--color-background);
  border-radius: 25px;
  transition: 0.4s ease-in-out;
}

/* 放大.card */
.card {
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 22px;
  transition: all 0.3s;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5); /* 放大 1.5 倍 */
  z-index: 100;
}

/* 背景模糊效果 */
.blurred {
  filter: blur(1em);
  -webkit-filter: blur(1em); /* Safari 兼容性 */
}

.card2 {
  border-radius: 0;
  transition: all 0.2s;
}

.card2:hover {
  transform: scale(0.98);
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0 0 30px 1px rgba(0, 255, 117, 0.3);
}

#heading {
  text-align: center;
  margin: 2em;
  color: var(--color-active);
  font-size: 1.1em;
}

.field {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 25px;
  padding: 0.6em;
  border: none;
  outline: none;
  color: var(--color-text);
  background-color: var(--color-background);
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5, 0.3);
}

.form input {
  font-size: 0.7em;
}

.input-icon {
  height: 1.3em;
  width: 1.3em;
}

.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--color-text);
}

.button1 {
  padding: 0.5em 1.1em;
  border-radius: 5px;
  margin-right: 0.5em;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: var(--color-background);
  color: var(--color-active);
  box-sizing: border-box; /* 新增，明确设置盒模型 */
}

.button1:hover {
  background-color: var(--color-active);
  color: var(--color-active-reverse);
}

.button2 {
  padding: 0.5em 2.3em;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: var(--color-background);
  color: var(--color-active);
}

.button2:hover {
  background-color: var(--color-active);
  color: var(--color-active-reverse);
}

.no-pointer-events {
  pointer-events: none;
}

footer {
  position: relative;
  bottom: 0;
  width: 100%;
}

.del_contact {
  /* 位于右边 */
  margin-left: auto;
}

.contact .icon {
  width: 1.3em;
  height: 1.3em;
  transition: scale 0.2s ease; /* 添加过渡效果，使颜色变化更平滑 */
}

.contact .icon:hover {
  scale: 150%;
}
</style>
