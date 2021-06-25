document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.getElementById('heading');
  h1.addEventListener('mouseenter', () => {
    h1.innerHTML = "Wouldn't you rather make a memorial trip?";
  });
  h1.addEventListener('mouseleave', () => {
    h1.innerHTML = 'Perfect Travel Tour';
  });
});
