document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.querySelector('.calendar-grid');
    const yearDisplay = document.querySelector('.year');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentYear = 2026;

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    function generateCalendar(year) {
        calendarGrid.innerHTML = ''; // Hapus kalender sebelumnya
        yearDisplay.textContent = year;

        for (let i = 0; i < 12; i++) {
            const monthCard = document.createElement('div');
            monthCard.className = 'month-card';

            const monthName = document.createElement('div');
            monthName.className = 'month-name';
            monthName.textContent = monthNames[i];
            monthCard.appendChild(monthName);

            const dayNamesContainer = document.createElement('div');
            dayNamesContainer.className = 'day-names';
            dayNames.forEach(day => {
                const dayName = document.createElement('span');
                dayName.textContent = day;
                dayNamesContainer.appendChild(dayName);
            });
            monthCard.appendChild(dayNamesContainer);

            const datesGrid = document.createElement('div');
            datesGrid.className = 'dates-grid';

            const firstDay = new Date(year, i, 1).getDay(); // Dapatkan hari pertama bulan
            const daysInMonth = new Date(year, i + 1, 0).getDate(); // Dapatkan jumlah hari

            // Tambahkan sel kosong untuk menyesuaikan posisi
            for (let j = 0; j < firstDay; j++) {
                const emptyCell = document.createElement('span');
                datesGrid.appendChild(emptyCell);
            }

            // Tambahkan tanggal
            for (let j = 1; j <= daysInMonth; j++) {
                const dateCell = document.createElement('span');
                dateCell.className = 'date-cell';
                dateCell.textContent = j;

                // Tambahkan fitur interaktif di sini
                dateCell.addEventListener('click', () => {
                    alert(`Anda mengklik tanggal ${j} ${monthNames[i]} ${year}`);
                    // Logika untuk menampilkan acara atau menambahkan catatan
                });
                
                // Menyoroti tanggal hari ini
                const today = new Date();
                if (j === today.getDate() && i === today.getMonth() && year === today.getFullYear()) {
                    dateCell.classList.add('today');
                }

                datesGrid.appendChild(dateCell);
            }

            monthCard.appendChild(datesGrid);
            calendarGrid.appendChild(monthCard);
        }
    }

    // Navigasi
    prevBtn.addEventListener('click', () => {
        currentYear--;
        generateCalendar(currentYear);
    });

    nextBtn.addEventListener('click', () => {
        currentYear++;
        generateCalendar(currentYear);
    });

    // Panggil fungsi untuk pertama kali
    generateCalendar(currentYear);
});
