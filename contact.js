/* =============================================
   CONTACT.JS — EmailJS form handler

   SETUP (takes about 5 minutes):
   ─────────────────────────────────────────────
   1. Go to https://www.emailjs.com → sign up free
   2. Add an Email Service (Gmail, Outlook, etc.)
      → copy the Service ID shown on that page
   3. Create an Email Template
      → use these variable names in your template:
          {{name}}  {{email}}  {{subject}}  {{message}}
      → copy the Template ID
   4. Go to Account → API Keys → copy your Public Key
   5. Paste all three values into the lines below
   ============================================= */

const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← paste here
const SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← paste here
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← paste here

/* Initialise EmailJS */
emailjs.init(PUBLIC_KEY);

/* ── Form submit ── */
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const status    = document.getElementById('form-status');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  /* Simple validation */
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showStatus('Please fill in your name, email, and message.', 'error');
    return;
  }

  /* Disable button while sending */
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending…';

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
    .then(() => {
      showStatus('Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
      submitBtn.textContent = 'Sent ✓';
      setTimeout(() => {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send Message →';
      }, 4000);
    })
    .catch((err) => {
      console.error(err);
      showStatus('Something went wrong. Please email me directly.', 'error');
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message →';
    });
});

/* Helper: display a status message then hide it after 6 s */
function showStatus(message, type) {
  status.textContent   = message;
  status.className     = type;      /* 'success' or 'error' */
  status.style.display = 'block';
  setTimeout(() => { status.style.display = 'none'; }, 6000);
}
