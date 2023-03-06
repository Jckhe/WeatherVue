<script>
import {
  GithubFilled,
  LinkedinFilled,
  IdcardFilled,
} from "@ant-design/icons-vue";
export default {
  name: "FooterIcons",
  components: {
    GithubFilled,
    LinkedinFilled,
    IdcardFilled,
  },
};
</script>

<template>
  <div class="footer-container">
    <div class="inner-footer-icons">
      <a target="_blank" href="https://github.com/Jckhe/WeatherVue">
        <github-filled />
      </a>
      <a target="_blank" href="https://www.linkedin.com/in/jackie-he/">
        <linkedin-filled />
      </a>
      <a target="_blank" href="https://www.jckhe.com/">
        <idcard-filled />
      </a>
    </div>
  </div>
</template>

<style>
.footer-container {
  position: absolute;
  bottom: 2%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}

.inner-footer-icons {
  position: relative;
  width: 10%;
  display: flex;
  margin-right: 3%;
  justify-content: space-around;
}

.inner-footer-icons * {
  font-size: 1.8rem;
  color: grey;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.inner-footer-icons *:hover {
  color: white;
  transform: scale(1.025);
  transition: all 0.2s ease-in-out;
}

.footer-icon {
  width: 33%;
}

.footer-icon:hover {
  transform: scale(1.025);
  transition: all 0.2s ease-in-out;
}
</style>
