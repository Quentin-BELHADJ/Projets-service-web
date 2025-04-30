<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} Mini Projet 2 - Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterContainer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
}
.footer-content {
  font-size: 14px;
}
</style>
