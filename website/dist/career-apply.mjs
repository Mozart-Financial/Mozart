const titles = {
  'founding-engineering-intern': 'Founding Engineering Intern',
  'deductions-accounting-frameworks-intern': 'Deductions & Accounting Frameworks Intern',
  'founding-engineer': 'Founding Engineer',
  'founding-deductions-accounting-lead': 'Founding Deductions & Accounting Lead',
  'founding-sdr': 'Founding SDR'
};
const slug = new URLSearchParams(location.search).get('role');
if (!Object.hasOwn(titles, slug)) location.replace('/careers');
else {
  document.getElementById('application-role').textContent = titles[slug];
  document.getElementById('role-slug').value = slug;
  document.title = `Apply: ${titles[slug]} — Mozart Financial`;
}
const form = document.getElementById('application-form');
const status = document.getElementById('application-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const resume = form.elements.resume.files[0];
  if (!resume || resume.size > 10 * 1024 * 1024 || !/\.(pdf|docx)$/i.test(resume.name)) {
    status.textContent = 'Attach a PDF or DOCX resume under 10 MB.';
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = 'Submitting your application…';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form) });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || 'We could not submit your application. Please try again.');
    form.reset();
    form.hidden = true;
    const thanks = document.createElement('p');
    thanks.className = 'application-success';
    thanks.setAttribute('role', 'status');
    thanks.textContent = 'Thank you. Your application has been received.';
    form.after(thanks);
  } catch (error) {
    status.textContent = error.message || 'We could not submit your application. Please try again.';
    button.disabled = false;
  }
});
