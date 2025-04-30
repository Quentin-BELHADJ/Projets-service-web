<template>
  <div v-if="show" class="dialog error-dialog">
    <p>{{ message }}</p>
    <button @click="closeDialog">Fermer</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorDialog',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: 'Une erreur est survenue.'
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.dialog {
  background: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  text-align: center;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  z-index: 1000;
}
button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
