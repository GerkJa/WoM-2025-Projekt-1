API_URL ='https://test-render-sjza.onrender.com/' //Change later
const form = document.getElementById('loginForm');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const errorEl = document.getElementById('error');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('togglePassword');
const newAcc = document.getElementById('newAcc');
// Show / hide password
toggleBtn.addEventListener('click', () => {
  const shown = passwordEl.type === 'text';
  passwordEl.type = shown ? 'password' : 'text';
  toggleBtn.textContent = shown ? 'Show' : 'Hide';
});

// Simple client-side validation for email/pass
function validate() {
  errorEl.style.display = 'none';
  errorEl.textContent = '';
  if (!emailEl.value.trim()) return 'Email is required';
  if (!/^\S+@\S+\.\S+$/.test(emailEl.value)) return 'Enter a valid email';
  if (!passwordEl.value) return 'Password is required';
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


  // Connect api here and recieve valid JWT
  try {
    const resp = await fetch(`${API_URL}users/login`, { //Temp Localhost link
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailEl.value.trim(),
        password: passwordEl.value,
      }),
    });

    if (!resp.ok) {
      const body = await resp.json().catch(() => ({ message: 'Unknown error' }));
      console.log(body) // LOG ERRORS, REMOVE--
      throw new Error(body.message || body.msg);
    }

    const data = await resp.json();
    if (data.jwt) localStorage.setItem('token', data.jwt);
    window.location.href = '../App/index.html';
  } catch (e) {
    errorEl.style.display = 'block';
    errorEl.textContent = e.message || 'Login failed';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign in';
  }
});
