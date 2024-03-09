<template>
  <ul class="timeline-container d-flex w-100">
    <li class="d-flex justify-content-center position-relative" :class="{ active: active === 'productCheck' || active === 'consumerCheck' || active === 'orderCheck' }">
      <div class="timeline-content d-flex flex-column align-items-center">
        <span
          class="timeline-item rounded-circle text-white text-center mb-2 z-1 fs-5 d-flex align-items-center justify-content-center fw-bold">1</span>
        確認商品
      </div>
    </li>
    <li class="d-flex justify-content-center position-relative" :class="{ active: active === 'consumerCheck' || active === 'orderCheck' }">
      <div class="timeline-content d-flex flex-column align-items-center">
        <span
          class="timeline-item rounded-circle text-white text-center mb-2 z-1 fs-5 d-flex align-items-center justify-content-center fw-bold">2</span>
        填寫聯絡資訊
      </div>
    </li>
    <li class="d-flex justify-content-center position-relative" :class="{ active: active === 'orderCheck' }">
      <div class="timeline-content d-flex flex-column align-items-center">
        <span
          class="timeline-item rounded-circle text-white text-center mb-2 z-1 fs-5 d-flex align-items-center justify-content-center fw-bold">3</span>
        查詢訂單
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  props: ['active']
}
</script>

<style lang="scss" scoped>
.timeline-container .timeline-item {
  height: 56px;
  width: 56px;
}
.timeline-container .timeline-content{
  color: #BEA6A0;
}
.timeline-container li::before,
.timeline-container .timeline-item{
  background-color:#BEA6A0;
}
.timeline-container li::before{
  content: '';
  position: absolute;
  height: 5px;
  margin-top: 28px;
}
.timeline-container li.active::before,
.timeline-container li.active .timeline-item{
  background-color: #E76952;
}
.timeline-container li.active .timeline-content{
  color: #E76952;
}
.timeline-container li{
  flex: 1;
}
.timeline-container li:first-child::before{
  left: 50%;
  width: 100%;
}
.timeline-container li:last-child::before{
  right: 50%;
  width: 100%;
}
</style>
