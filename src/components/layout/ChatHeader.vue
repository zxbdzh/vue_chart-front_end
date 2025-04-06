<script lang="ts" setup>
import { defineEmits } from 'vue'
import { useThemeStore } from '@/stores/theme.ts'
import router from '@/router'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()

// 主题
const theme = useThemeStore()

// 自定义事件
const emits = defineEmits(['toggleSidebar'])

// 折叠侧边栏
const toggleSidebar = () => {
  // 触发自定义事件
  emits('toggleSidebar')
}

// 登出方法
const logout = () => {
  // 这里添加实际登出逻辑，例如：
  // 1. 清除用户token
  userStore.userInfo.token = ''
  // 2. 跳转到登录页
  router.push('/login').then(() => {
    window.location.reload()
  })
}

// props
defineProps({
  chatUserName: {
    type: String,
    default: 'xxxxx',
  },
})
</script>

<template>
  <header class="header">
    <!-- 在header内现有按钮前添加登出按钮 -->
    <i class="fas fa-user-circle" style="font-size: 2em; margin-right: 10px"></i>
    <h2>与 {{ chatUserName }} 聊天中</h2>

    <button @click="logout" class="logout-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </button>

    <!--  亮暗色图标  -->
    <label class="theme-switch">
      <input
        type="checkbox"
        class="theme-switch__checkbox"
        :checked="theme.isDark"
        @click="theme.changeDark()"
      />
      <div class="theme-switch__container">
        <div class="theme-switch__clouds"></div>
        <div class="theme-switch__stars-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div class="theme-switch__circle-container">
          <div class="theme-switch__sun-moon-container">
            <div class="theme-switch__moon">
              <div class="theme-switch__spot"></div>
              <div class="theme-switch__spot"></div>
              <div class="theme-switch__spot"></div>
            </div>
          </div>
        </div>
      </div>
    </label>

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
  </header>
</template>

<style scoped>
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
  .toggle-sidebar-btn {
    display: block; /* 在移动端显示折叠图标 */
  }
}

.header {
  background-color: var(--color-background-mute);
  padding: 10px 20px;
  border-bottom: 1px solid var(--color-text);
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  height: 60px;
}

/* 亮暗色切换 */
.theme-switch {
  position: fixed;
  top: 13px; /* 根据实际位置调整 */
  right: 60px; /* 留出折叠按钮的空间 */
  z-index: 10; /* 保持相同层级 */
  --toggle-size: 0.9em;
  /* the size is adjusted using font-size,
     this is not transform scale,
     so you can choose any size */
  --container-width: 4.635em;
  --container-height: 1.7em;
  --container-radius: 6.25em;
  /* radius 0 - minecraft mode :) */
  --container-light-bg: #3d7eae;
  --container-night-bg: #1d1f2c;
  --circle-container-diameter: 3.375em;
  --sun-moon-diameter: 2.125em;
  --sun-bg: #ecca2f;
  --moon-bg: #c4c9d1;
  --spot-color: #959db1;
  --circle-container-offset: calc(
    (var(--circle-container-diameter) - var(--container-height)) / 2 * -1
  );
  --stars-color: #fff;
  --clouds-color: #f3fdff;
  --back-clouds-color: #aacadf;
  --transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  --circle-transition: 0.3s cubic-bezier(0, -0.02, 0.35, 1.17);
}

.theme-switch,
.theme-switch *,
.theme-switch *::before,
.theme-switch *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: var(--toggle-size);
}

.theme-switch__container {
  width: var(--container-width);
  height: var(--container-height);
  background-color: var(--container-light-bg);
  border-radius: var(--container-radius);
  overflow: hidden;
  cursor: pointer;
  -webkit-box-shadow:
    0 -0.062em 0.062em rgba(0, 0, 0, 0.25),
    0 0.062em 0.125em rgba(255, 255, 255, 0.94);
  box-shadow:
    0 -0.062em 0.062em rgba(0, 0, 0, 0.25),
    0 0.062em 0.125em rgba(255, 255, 255, 0.94);
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
  position: relative;
}

.theme-switch__container::before {
  content: '';
  position: absolute;
  z-index: 1;
  inset: 0;
  -webkit-box-shadow:
    0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset,
    0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
  box-shadow:
    0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset,
    0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
  border-radius: var(--container-radius);
}

.theme-switch__checkbox {
  display: none;
}

.theme-switch__circle-container {
  width: var(--circle-container-diameter);
  height: var(--circle-container-diameter);
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  left: var(--circle-container-offset);
  top: var(--circle-container-offset);
  border-radius: var(--container-radius);
  -webkit-box-shadow:
    inset 0 0 0 3.375em rgba(255, 255, 255, 0.1),
    inset 0 0 0 3.375em rgba(255, 255, 255, 0.1),
    0 0 0 0.625em rgba(255, 255, 255, 0.1),
    0 0 0 1.25em rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 0 0 3.375em rgba(255, 255, 255, 0.1),
    inset 0 0 0 3.375em rgba(255, 255, 255, 0.1),
    0 0 0 0.625em rgba(255, 255, 255, 0.1),
    0 0 0 1.25em rgba(255, 255, 255, 0.1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition: var(--circle-transition);
  -o-transition: var(--circle-transition);
  transition: var(--circle-transition);
  pointer-events: none;
}

.theme-switch__sun-moon-container {
  pointer-events: auto;
  position: relative;
  z-index: 2;
  width: var(--sun-moon-diameter);
  height: var(--sun-moon-diameter);
  margin: auto;
  border-radius: var(--container-radius);
  background-color: var(--sun-bg);
  -webkit-box-shadow:
    0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset,
    0em -0.062em 0.062em 0em #a1872a inset;
  box-shadow:
    0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset,
    0em -0.062em 0.062em 0em #a1872a inset;
  -webkit-filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25))
    drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
  filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25))
    drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
  overflow: hidden;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
}

.theme-switch__moon {
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
  width: 100%;
  height: 100%;
  background-color: var(--moon-bg);
  border-radius: inherit;
  -webkit-box-shadow:
    0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset,
    0em -0.062em 0.062em 0em #969696 inset;
  box-shadow:
    0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset,
    0em -0.062em 0.062em 0em #969696 inset;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
  position: relative;
}

.theme-switch__spot {
  position: absolute;
  top: 0.75em;
  left: 0.312em;
  width: 0.75em;
  height: 0.75em;
  border-radius: var(--container-radius);
  background-color: var(--spot-color);
  -webkit-box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
  box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
}

.theme-switch__spot:nth-of-type(2) {
  width: 0.375em;
  height: 0.375em;
  top: 0.937em;
  left: 1.375em;
}

.theme-switch__spot:nth-last-of-type(3) {
  width: 0.25em;
  height: 0.25em;
  top: 0.312em;
  left: 0.812em;
}

.theme-switch__clouds {
  width: 1.25em;
  height: 1.25em;
  background-color: var(--clouds-color);
  border-radius: var(--container-radius);
  position: absolute;
  bottom: -0.625em;
  left: 0.312em;
  -webkit-box-shadow:
    0.937em 0.312em var(--clouds-color),
    -0.312em -0.312em var(--back-clouds-color),
    1.437em 0.375em var(--clouds-color),
    0.5em -0.125em var(--back-clouds-color),
    2.187em 0 var(--clouds-color),
    1.25em -0.062em var(--back-clouds-color),
    2.937em 0.312em var(--clouds-color),
    2em -0.312em var(--back-clouds-color),
    3.625em -0.062em var(--clouds-color),
    2.625em 0em var(--back-clouds-color),
    4.5em -0.312em var(--clouds-color),
    3.375em -0.437em var(--back-clouds-color),
    4.625em -1.75em 0 0.437em var(--clouds-color),
    4em -0.625em var(--back-clouds-color),
    4.125em -2.125em 0 0.437em var(--back-clouds-color);
  box-shadow:
    0.937em 0.312em var(--clouds-color),
    -0.312em -0.312em var(--back-clouds-color),
    1.437em 0.375em var(--clouds-color),
    0.5em -0.125em var(--back-clouds-color),
    2.187em 0 var(--clouds-color),
    1.25em -0.062em var(--back-clouds-color),
    2.937em 0.312em var(--clouds-color),
    2em -0.312em var(--back-clouds-color),
    3.625em -0.062em var(--clouds-color),
    2.625em 0em var(--back-clouds-color),
    4.5em -0.312em var(--clouds-color),
    3.375em -0.437em var(--back-clouds-color),
    4.625em -1.75em 0 0.437em var(--clouds-color),
    4em -0.625em var(--back-clouds-color),
    4.125em -2.125em 0 0.437em var(--back-clouds-color);
  -webkit-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  -o-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
}

.theme-switch__stars-container {
  position: absolute;
  color: var(--stars-color);
  top: -100%;
  left: 0.312em;
  width: 2.75em;
  height: auto;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
}

/* actions */

.theme-switch__checkbox:checked + .theme-switch__container {
  background-color: var(--container-night-bg);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
  left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
  left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em);
}

.theme-switch__circle-container:hover {
  left: calc(var(--circle-container-offset) + 0.187em);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
  -webkit-transform: translate(0);
  -ms-transform: translate(0);
  transform: translate(0);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
  bottom: -4.062em;
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

/* 登出按钮样式 */
.logout-btn {
  position: fixed;
  top: 11px;
  right: 140px; /* 60px(主题位置) + 80px(主题宽度) */
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 3px 8px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logout-btn:hover {
  background: var(--color-background);
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.logout-btn svg {
  width: 18px;
  height: 18px;
  stroke: var(--color-active);
  transition: stroke 0.3s ease;
}

/* 主题切换位置保持原样 */
.theme-switch {
  position: fixed;
  top: 13px;
  right: 60px;
  z-index: 10;
  /* 原有自定义属性保持不变 */
  --toggle-size: 0.9em;
  --container-width: 4.635em;
  --container-height: 1.7em;
  /* 其他自定义属性... */
}

/* 折叠按钮保持原样 */
.toggle-sidebar-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  /* 原有样式... */
}

/* 移动端适配 */
@media (max-width: 768px) {
  .logout-btn {
    right: 110px; /* 40px(主题位置) + 70px(缩小后的主题宽度) */
    padding: 5px 8px;
  }

  .theme-switch {
    right: 40px;
    --toggle-size: 0.8em; /* 缩小主题开关尺寸 */
  }

  .logout-btn svg {
    width: 16px;
    height: 16px;
  }
}

/* 超小屏幕适配 */
@media (max-width: 480px) {
  .logout-btn {
    right: 90px;
    padding: 4px 6px;
  }

  .theme-switch {
    right: 30px;
    --toggle-size: 0.7em;
  }
}
</style>
