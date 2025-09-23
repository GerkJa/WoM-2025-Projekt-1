const form = document.getElementById('loginForm');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const errorEl = document.getElementById('error');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('togglePassword');
const demoBtn = document.getElementById('demoBtn');

// Show / hide password
toggleBtn.addEventListener('click', () => {
  const shown = passwordEl.type === 'text';
  passwordEl.type = shown ? 'password' : 'text';
  toggleBtn.textContent = shown ? 'Show' : 'Hide';
});

// Simple client-side validation
function validate() {
  errorEl.style.display = 'none';
  errorEl.textContent = '';
  if (!emailEl.value.trim()) return 'Email is required';
  if (!/^\S+@\S+\.\S+$/.test(emailEl.value)) return 'Enter a valid email';
  if (!passwordEl.value) return 'Password is required';
  if (passwordEl.value.length < 6) return 'Password must be at least 6 characters';
  return null;
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const err = validate();
  if (err) {
    errorEl.style.display = 'block';
    errorEl.textContent = err;
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in...';

  try {
    const resp = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailEl.value.trim(),
        password: passwordEl.value,
      }),
    });

    if (!resp.ok) {
      const body = await resp.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(body.message || 'Login failed');
    }

    const data = await resp.json();
    if (data.token) localStorage.setItem('token', data.token);
    window.location.href = '/app';
  } catch (e) {
    errorEl.style.display = 'block';
    errorEl.textContent = e.message || 'Login failed';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign in';
  }
});

// Demo button (auto-fill)
demoBtn.addEventListener('click', () => {
  emailEl.value = 'demo@example.com';
  passwordEl.value = 'password';
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
});
