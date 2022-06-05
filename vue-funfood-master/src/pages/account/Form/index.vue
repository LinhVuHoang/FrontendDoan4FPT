<!--
<template>
  <div>
    <h2>Creat account</h2>
    <a-card>
      <a-form style="width: 50%;margin: auto">
        <a-form-item label="Name">
          <a-input  placeholder="Name role"/>
        </a-form-item>
        <a-form-item label="Password">
          <a-input  placeholder="Password"/>
        </a-form-item>
        <a-form-item label="Select role">
          <a-select
              mode="single"
              style="width: 100%"
              placeholder="Please select"
              >
            <a-select-option >
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-button style="margin-right: 15px">
        </a-button>
        <a-button>
          Clear
        </a-button>
      </a-form>
    </a-card>
  </div>

</template>

<script>

</script>-->
<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </a>
          </li>
          <drop-down class="nav-item"
                     title="5 Notifications"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Settings
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>
<style>
</style>
