const filterBtn = document.querySelectorAll('.filter-btn');

filterBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtn.forEach(button => {
            button.classList.remove('btn-primary');
        });
        btn.classList.add('btn-primary');
    });
});