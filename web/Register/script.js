const form = document.getElementById('loginForm');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const errorEl = document.getElementById('error');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('togglePassword');

//toggle show password
toggleBtn.addEventListener('click', () => {
  const shown = passwordEl.type === 'text';
  passwordEl.type = shown ? 'password' : 'text';
  toggleBtn.textContent = shown ? 'Show' : 'Hide';
});

//----------sign in

//Client side validation
// Simple client-side validation
function validate() {
  errorEl.style.display = 'none';
  errorEl.textContent = '';
  if (!emailEl.value.trim()) return 'Email is required';
  if (!/^\S+@\S+\.\S+$/.test(emailEl.value)) return 'Enter a valid email';
  if (!passwordEl.value) return 'Password is required';
  return null;
}

