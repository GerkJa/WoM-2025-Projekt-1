API_URL ='https://test-render-sjza.onrender.com/' //change later
const form = document.getElementById('loginForm');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const passwordEl2 = document.getElementById('ConfirmPassword')
const errorEl = document.getElementById('error');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('togglePassword');
const toggleBtn2 = document.getElementById('togglePassword2');
const usernameEl = document.getElementById('username');

//toggle show password and confirm
toggleBtn.addEventListener('click', () => {
  const shown = passwordEl.type === 'text';
  passwordEl.type = shown ? 'password' : 'text';
  toggleBtn.textContent = shown ? 'Show' : 'Hide';
});
toggleBtn2.addEventListener('click', () => {
  const shown = passwordEl2.type === 'text';
  passwordEl2.type = shown ? 'password' : 'text';
  toggleBtn2.textContent = shown ? 'Show' : 'Hide';
});

//Client side validation

function validate() {
  errorEl.style.display = 'none';
  errorEl.textContent = '';
  if (!emailEl.value.trim()) return 'Email is required';
  if (!/^\S+@\S+\.\S+$/.test(emailEl.value)) return 'Enter a valid email';
  if (!usernameEl.value.trim()) return 'Username required'
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
    const resp = await fetch(`${API_URL}users/register`, { //Temp Localhost link
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailEl.value.trim(),
        password: passwordEl.value,
        name: usernameEl.value
      }),
    });

    if (!resp.ok) {
      const body = await resp.json().catch(() => ({ message: 'Unknown error' }));
      console.log(body) // LOG ERRORS, REMOVE--
      throw new Error(body.message || body.msg);
    }

    const data = await resp.json();   //recieve jwt and reloc
    if (data.token) localStorage.setItem('token', data.token);
    window.location.href = '../App/index.html';
  } catch (e) {
    errorEl.style.display = 'block';
    errorEl.textContent = e.message || 'Login failed';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign in';
  }
});

