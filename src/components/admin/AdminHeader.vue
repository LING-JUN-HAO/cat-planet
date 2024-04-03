<template>
  <header class="header-container sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-hex">
      <div class="container-fluid">
        <div class="nav-brand-container ms-3 py-1">
          <img class="title-icon me-3" src="@/assets/image/logo-cat.svg" alt="喵星球">
          <img class="title-content ms-4" src="@/assets/image/favicon-cat.png" alt="喵星球">
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mb-2 mb-lg-0 w-100 justify-content-end pe-4">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/admin/products">
                <i class="bi bi-handbag-fill"></i>
                產品管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/admin/vouchers">
                <i class="bi bi-ticket"></i>
                優惠卷管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/admin/orders">
                <i class="bi bi-card-list"></i>
                訂單管理
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
