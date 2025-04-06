<script lang="ts" setup>
import { UserDto } from '@/pojo/user.ts'
import { onMounted, ref } from 'vue'
import request from '@/utils/request'
import router from '@/router'
import { useUserStore } from '@/stores/user.ts'

const userDto = new UserDto('', '')
// userStore
const userStore = useUserStore()
const isLoading = ref(false)

async function login(): Promise<void> {
  isLoading.value = true
  await request({
    url: '/user/login',
    method: 'POST',
    data: userDto,
  }).then((res) => {
    if (res.data.code === 200) {
      router.push('/chat')
      // 获取用户信息
      getUserInfo()
    }
    isLoading.value = false
  })
}

async function getUserInfo(): Promise<void> {
  await request({
    url: '/user/info',
    method: 'GET',
  }).then((res) => {
    userStore.userInfo.id = res.data.data.id
    userStore.userInfo.username = res.data.data.username
  })
}

onMounted(() => {})
</script>

<template>
  <div v-loading="isLoading" class="wrapper">
    <div class="card-switch">
      <label class="switch">
        <input class="toggle" type="checkbox" />
        <span class="slider"></span>
        <span class="card-side"></span>
        <div class="flip-card__inner">
          <div class="flip-card__front">
            <div class="title">Log in</div>
            <form class="flip-card__form" @submit.prevent="login">
              <div class="form-control">
                <input v-model="userDto.username" :required="true" type="text" />
                <label>
                  <span style="transition-delay: 0ms">U</span
                  ><span style="transition-delay: 50ms">s</span
                  ><span style="transition-delay: 100ms">e</span
                  ><span style="transition-delay: 150ms">r</span
                  ><span style="transition-delay: 200ms">n</span
                  ><span style="transition-delay: 250ms">a</span
                  ><span style="transition-delay: 300ms">m</span
                  ><span style="transition-delay: 350ms">e</span>
                </label>
              </div>
              <div class="form-control">
                <input v-model="userDto.password" :required="true" type="password" />
                <label>
                  <span style="transition-delay: 0ms">P</span
                  ><span style="transition-delay: 50ms">a</span
                  ><span style="transition-delay: 100ms">s</span
                  ><span style="transition-delay: 150ms">s</span
                  ><span style="transition-delay: 200ms">w</span
                  ><span style="transition-delay: 250ms">o</span
                  ><span style="transition-delay: 300ms">r</span
                  ><span style="transition-delay: 350ms">d</span>
                </label>
              </div>
              <button class="flip-card__btn">Let`s go!</button>
            </form>
          </div>
          <div class="flip-card__back">
            <div class="title">Sign up</div>
            <form action="" class="flip-card__form">
              <div class="form-control">
                <input :required="true" type="text" />
                <label>
                  <span style="transition-delay: 0ms">N</span
                  ><span style="transition-delay: 50ms">a</span
                  ><span style="transition-delay: 100ms">m</span
                  ><span style="transition-delay: 150ms">e</span>
                </label>
              </div>
              <div class="form-control">
                <input :required="true" type="email" />
                <label>
                  <span style="transition-delay: 0ms">E</span
                  ><span style="transition-delay: 50ms">m</span
                  ><span style="transition-delay: 100ms">a</span
                  ><span style="transition-delay: 150ms">i</span
                  ><span style="transition-delay: 200ms">l</span>
                </label>
              </div>
              <div class="form-control">
                <input :required="true" type="password" />
                <label>
                  <span style="transition-delay: 0ms">P</span
                  ><span style="transition-delay: 50ms">a</span
                  ><span style="transition-delay: 100ms">s</span
                  ><span style="transition-delay: 150ms">s</span
                  ><span style="transition-delay: 200ms">w</span
                  ><span style="transition-delay: 250ms">o</span
                  ><span style="transition-delay: 300ms">r</span
                  ><span style="transition-delay: 350ms">d</span>
                </label>
              </div>
              <button class="flip-card__btn">Confirm!</button>
            </form>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  position: relative;
  /*margin: 20px 0 40px;*/
  width: 100%;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #fff;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: black;
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: #fff;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: #858585;
  font-weight: bold;
  transform: translateY(-30px);
}

.wrapper {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 视口高度，也可以是固定的像素值等 */
  justify-content: center;
}

/* switch card */
.switch {
  transform: translateY(-200px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
}

.card-side::before {
  position: absolute;
  content: 'Log in';
  left: -70px;
  top: 0;
  width: 100px;
  text-decoration: underline;
  color: var(--color-text);
  font-weight: 600;
}

.card-side::after {
  position: absolute;
  content: 'Sign up';
  left: 70px;
  top: 0;
  width: 100px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-colorcolor);
  transition: 0.3s;
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--bg-color);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;
}

.toggle:checked + .slider {
  background-color: var(--input-focus);
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
}

.toggle:checked ~ .card-side:after {
  text-decoration: underline;
}

/* card */

.flip-card__inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
  /* width: 100%;
  height: 100%; */
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.toggle:checked ~ .flip-card__inner {
  transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card__front {
  box-shadow: none;
}

.flip-card__front,
.flip-card__back {
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: lightgrey;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.flip-card__back {
  width: 100%;
  transform: rotateY(180deg);
}

.flip-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.title {
  margin: 20px 0 20px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: var(--main-color);
}

.flip-card__btn:active,

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}
</style>
