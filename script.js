document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.querySelector('.calendar-grid');
    const yearDisplay = document.querySelector('.year');
    const monthTabsContainer = document.querySelector('.month-tabs');
    
    let currentYear = 2026;
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    function generateCalendar(year) {
        calendarGrid.innerHTML = ''; // Hapus kalender sebelumnya
        yearDisplay.textContent = year;

        monthNames.forEach((monthName, i) => {
            const monthCard = document.createElement('div');
            monthCard.className = 'month-card';
            monthCard.id = `month-${i}`; // Tambahkan ID untuk navigasi

            const monthTitle = document.createElement('div');
            monthTitle.className = 'month-name';
            monthTitle.textContent = monthName;
            monthCard.appendChild(monthTitle);

            const dayNamesContainer = document.createElement('div');
            dayNamesContainer.className = 'day-names';
            dayNames.forEach(day => {
                const daySpan = document.createElement('span');
                daySpan.textContent = day;
                dayNamesContainer.appendChild(daySpan);
            });
            monthCard.appendChild(dayNamesContainer);

            const datesGrid = document.createElement('div');
            datesGrid.className = 'dates-grid';

            const firstDay = new Date(year, i, 1).getDay(); // Dapatkan hari pertama bulan
            const daysInMonth = new Date(year, i + 1, 0).getDate(); // Dapatkan jumlah hari

            // Tambahkan sel kosong untuk menyesuaikan posisi hari pertama
            for (let j = 0; j < firstDay; j++) {
                const emptyCell = document.createElement('span');
                emptyCell.className = 'date-cell empty'; // Tambahkan kelas empty
                datesGrid.appendChild(emptyCell);
            }

            // Tambahkan tanggal
            for (let j = 1; j <= daysInMonth; j++) {
                const dateCell = document.createElement('span');
                dateCell.className = 'date-cell';
                dateCell.textContent = j;

                // Menambahkan interaktivitas (contoh: alert)
                dateCell.addEventListener('click', () => {
                    alert(`Anda memilih tanggal ${j} ${monthName} ${year}`);
                    // Di sini Anda bisa menambahkan logika untuk pop-up detail acara atau input catatan
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
        });

        // Setelah semua bulan dimuat, atur active tab ke bulan saat ini
        setActiveMonthTab();
    }

    function setActiveMonthTab() {
        const today = new Date();
        const currentMonthIndex = today.getMonth(); // Indeks bulan saat ini (0-11)
        
        // Hapus kelas 'active' dari semua tab
        document.querySelectorAll('.month-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Tambahkan kelas 'active' ke tab bulan yang sesuai
        const activeTab = document.querySelector(`.month-tab[data-month="${currentMonthIndex}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    // Event listener untuk navigasi bulan (tabs di bagian bawah)
    monthTabsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('month-tab')) {
            const monthIndex = event.target.dataset.month;
            const monthCard = document.getElementById(`month-${monthIndex}`);
            if (monthCard) {
                // Gulir ke tampilan bulan yang dipilih
                monthCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Atur kelas active pada tab yang diklik
                document.querySelectorAll('.month-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                event.target.classList.add('active');
            }
        }
    });

    // Panggil fungsi untuk pertama kali
    generateCalendar(currentYear);
});
