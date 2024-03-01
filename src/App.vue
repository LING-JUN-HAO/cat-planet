<template>
  <router-view></router-view>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap');

* {
  font-family: 'Noto Sans TC', sans-serif;
  list-style: none;
  margin: 0px;
  padding: 0px;
}
html,
body {
  height: 100%;
}
.btn:hover{
  color: white !important;
}
textarea{
  resize: none !important;
}
.modal-open {
  overflow: hidden;
}
</style>
