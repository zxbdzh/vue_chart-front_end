<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const isSidebarCollapsed = ref(false)
const isCardVisible = ref(false) // 新增响应式变量控制卡片显示

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

onMounted(() => {
  const isMobile = window.innerWidth <= 768
  if (isMobile) {
    isSidebarCollapsed.value = true
  }
})
</script>

<template>
  <!--  弹层  -->
  <div v-if="isCardVisible" class="card">
    <div class="card2">
      <form class="form">
        <p id="heading">添加好友</p>
        <div class="field">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            class="input-icon"
          >
            <path
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
            ></path>
          </svg>
          <input type="text" class="input-field" placeholder="请输入好友ID" autocomplete="off" />
        </div>
        <div class="field">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            class="input-icon"
          >
            <path
              d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"
            ></path>
          </svg>
          <input type="text" class="input-field" placeholder="请输入验证消息" />
        </div>
        <div class="btn">
          <button class="button1">发送请求</button>
          <button class="button2" @click="isCardVisible=false">取消</button>
        </div>
      </form>
    </div>
  </div>
  <div class="container" :class="{ blurred: isCardVisible, 'no-pointer-events': isCardVisible }">
    <!-- 折叠图标 -->
    <button @click="toggleSidebar" class="toggle-sidebar-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
    <aside :class="{ sidebar: true, collapsed: isSidebarCollapsed }">
      <div class="searchbar">
        <svg
          t="1737636062235"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4173"
          data-darkreader-inline-fill=""
          width="24"
          height="24"
          @click="isCardVisible=true"
        >
          <path
            d="M512 958.016611c-119.648434 0-232.1288-46.367961-316.736783-130.559656-84.640667-84.255342-131.263217-196.255772-131.263217-315.455235 0-119.168499 46.624271-231.199892 131.232254-315.424271 84.607983-84.191695 197.088348-130.559656 316.736783-130.559656s232.1288 46.367961 316.704099 130.559656c84.67163 84.224378 131.263217 196.255772 131.263217 315.391587 0.032684 119.199462-46.591587 231.232576-131.263217 315.455235C744.1288 911.615966 631.648434 958.016611 512 958.016611zM512 129.983389c-102.623626 0-199.071738 39.743475-271.583282 111.936783-72.480581 72.12794-112.416718 168.063432-112.416718 270.079828s39.903454 197.951888 112.384034 270.047144c72.511544 72.191587 168.959656 111.936783 271.583282 111.936783 102.592662 0 199.071738-39.743475 271.583282-111.936783 72.480581-72.160624 112.416718-168.063432 112.384034-270.079828 0-102.016396-39.903454-197.919204-112.384034-270.016181C711.071738 169.759548 614.592662 129.983389 512 129.983389z"
            fill="#575B66"
            p-id="4174"
            data-darkreader-inline-fill=""
          ></path>
          <path
            d="M736.00086 480.00086 544.00086 480.00086 544.00086 288.00086c0-17.664722-14.336138-32.00086-32.00086-32.00086s-32.00086 14.336138-32.00086 32.00086l0 192L288.00086 480.00086c-17.664722 0-32.00086 14.336138-32.00086 32.00086s14.336138 32.00086 32.00086 32.00086l192 0 0 192c0 17.695686 14.336138 32.00086 32.00086 32.00086s32.00086-14.303454 32.00086-32.00086L544.00258 544.00086l192 0c17.695686 0 32.00086-14.336138 32.00086-32.00086S753.696546 480.00086 736.00086 480.00086z"
            fill="#575B66"
            p-id="4175"
            data-darkreader-inline-fill=""
          ></path>
        </svg>
        <input type="text" placeholder="搜索..." />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      <div style="margin: 10px"></div>
      <div class="contact active"><i class="fas fa-user-circle"></i> Alice</div>
      <div class="contact"><i class="fas fa-user-circle"></i> Bob</div>
      <div class="contact"><i class="fas fa-user-circle"></i> Charlie</div>
      <div class="contact"><i class="fas fa-user-circle"></i> David</div>
    </aside>
    <main class="main">
      <header class="header">
        <i class="fas fa-user-circle" style="font-size: 2em; margin-right: 10px"></i>
        <h2>与 Alice 聊天中</h2>
      </header>
      <section class="chat-area">
        <div class="message received">嘿，你好！最近怎么样？</div>
        <div class="message sent">嗨 Alice！我很好，谢谢关心。你呢？</div>
        <div class="message received">我也不错！正在做一些项目。你在忙什么呢？</div>
      </section>
      <footer class="input-area">
        <input type="text" placeholder="输入消息..." />
        <button><i class="fas fa-paper-plane"></i></button>
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
  height: 100vh;
  transition: filter 0.5s ease;
}

.sidebar {
  width: 250px;
  background-color: var(--color-background);
  color: var(--color-text);
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 5; /* 添加 z-index，确保侧边栏在展开时显示在最上层 */
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
}

.header {
  background-color: var(--color-background-mute);
  padding: 10px 20px;
  border-bottom: 1px solid var(--color-text);
  display: flex;
  align-items: center;
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
  padding: 20px;
  background-color: var(--color-background-mute);
  border-top: 1px solid var(--color-text);
  display: flex;
  align-items: center;
}

.contact {
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: font-weight 0.3s ease; /* 添加过渡效果，使颜色变化更平滑 */
}

.contact:hover {
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
  background-color: var(--color-background);
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
  color: var(--color-background);
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
  color: var(--color-background);
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

/* 鼠标悬停在 .icon 上时，改变 .icon path 的 fill 属性 */
.icon:hover path {
  fill: var(--color-text); /* 悬停时的填充颜色，可根据需求修改 */
}

.toggle-sidebar-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  /*
  display: none; !* 默认隐藏折叠图标 *!
  */
}

.toggle-sidebar-btn svg {
  stroke: var(--color-active);
  transition: fill 0.3s ease; /* 添加过渡效果，使颜色变化更平滑 */
}

/* 媒体查询，当屏幕宽度小于 768px 时，侧边栏默认折叠 */
@media (max-width: 768px) {
  .sidebar {
    width: 0;
    padding: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
  }

  .sidebar:not(.collapsed) {
    width: 250px;
  }

  .toggle-sidebar-btn {
    display: block; /* 在移动端显示折叠图标 */
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 2em;
  padding-right: 2em;
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
  transform: translate(-50%, -50%) scale(1.2); /* 放大 1.2 倍 */
  z-index: 100;
}

/* 背景模糊效果 */
.blurred {
  filter: blur(5px);
  -webkit-filter: blur(5px); /* Safari 兼容性 */
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
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
}

#heading {
  text-align: center;
  margin: 2em;
  color: var(--color-active);
  font-size: 1.2em;
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
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5, .2);
}

@media (prefers-color-scheme: dark) {
  .field {
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }
}

.input-icon {
  height: 1.3em;
  width: 1.3em;
  fill: var(--color-text);
}

.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #d3d3d3;
}

.form .btn {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2.5em;
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
</style>
