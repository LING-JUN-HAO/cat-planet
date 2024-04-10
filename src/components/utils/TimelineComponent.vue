<template>
  <ul class="timeline-container d-flex w-100">
    <li class="d-flex justify-content-center position-relative"
      :class="{ active: active === 'productCheck' || active === 'consumerCheck' || active === 'orderCheck' }">
      <div class="timeline-content d-flex flex-column align-items-center">
        <span
          class="timeline-item rounded-circle text-white text-center mb-2 z-1 d-flex align-items-center justify-content-center fw-bold">1</span>
        確認商品
      </div>
    </li>
    <li class="d-flex justify-content-center position-relative"
      :class="{ active: active === 'consumerCheck' || active === 'orderCheck' }">
      <div class="timeline-content d-flex flex-column align-items-center">
        <span
          class="timeline-item rounded-circle text-white text-center mb-2 z-1 d-flex align-items-center justify-content-center fw-bold">2</span>
        填寫聯絡資訊
      </div>
    </li>
    <li class="d-flex justify-content-center position-relative" :class="{ active: active === 'orderCheck' }">
      <div class="timeline-content d-flex flex-column align-items-center">
        <span
          class="timeline-item rounded-circle text-white text-center mb-2 z-1 d-flex align-items-center justify-content-center fw-bold">3</span>
        訂購完成
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  props: ['active']
}
</script>
