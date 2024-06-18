document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to navigation links on scroll
    window.addEventListener('scroll', function() {
        let sections = document.querySelectorAll('section');
        let scrollPosition = window.scrollY + 100; // Offset for fixed header

        sections.forEach(section => {
            let id = section.getAttribute('id');
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                document.querySelector('nav ul li a[href="#' + id + '"]').classList.add('active');
            } else {
                document.querySelector('nav ul li a[href="#' + id + '"]').classList.remove('active');
            }
        });
    });

    // Example of interactive element: Toggle content visibility
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function() {
            let content = document.querySelector(this.getAttribute('data-target'));
            content.classList.toggle('hidden');
        });
    });

    // Initialize Leaflet map if it exists on the page
    if (document.getElementById('map')) {
        var map = L.map('map').setView([56.967968, 21.970842], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var markers = L.markerClusterGroup();

        // Data points for the map (example)
        var sites = [
            {
                coords: [56.9687567836292, 21.9647661265699],
                iconColor: 'red',
                title: 'BALTIC TEACHERS\' SEMINARY',
                address: 'Kuldīgas nov., Kuldīga, Liepājas iela 31',
                type: 'Historical Event Site',
                valueGroup: 'Nationally Significant Cultural Monument',
                dating: '1886-1915',
                accessibility: 'Available',
                status: 'Satisfactory',
                img: 'http://ekas.kuldiga.lv/img/atteli/1213948223485b613f165ea.jpg' 
            },
            {
                coords: [56.9679683104667, 21.9708420049112],
                iconColor: 'blue',
                title: 'KULDĪGA OLD TOWN',
                address: 'Kuldīgas nov., Kuldīga; centrā',
                type: 'Archaeology',
                valueGroup: 'Nationally Significant Cultural Monument',
                dating: 'Medieval - Modern Times; 13th - 19th century',
                accessibility: 'Available',
                status: 'Good',
                img: 'https://visitkuldiga.com/wp-content/uploads/2021/12/Kuldiga-no-augsas-1025x768.jpg?lang=en' 
            }
            // Add more sites here...
        ];

        sites.forEach(function(site) {
            var marker = L.marker(site.coords, {
                icon: L.AwesomeMarkers.icon({
                    icon: 'info-sign',
                    iconColor: 'white',
                    markerColor: site.iconColor,
                    prefix: 'glyphicon'
                })
            });

            var popupContent = `
                <div style="width: 200px;">
                    <img src="${site.img}" style="width: 100%; height: auto;" />
                    <b>${site.title}</b><br>
                    <b>Address:</b> ${site.address}<br>
                    <b>Typological Group:</b> ${site.type}<br>
                    <b>Value Group:</b> ${site.valueGroup}<br>
                    <b>Dating:</b> ${site.dating}<br>
                    <b>Public Accessibility:</b> ${site.accessibility}<br>
                    <b>Preservation Status:</b> ${site.status}<br>
                </div>
            `;

            marker.bindPopup(popupContent);
            markers.addLayer(marker);
        });

        map.addLayer(markers);
    }
    
    // Highlight active navigation link based on the current URL
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('nav ul li a');
    menuItem.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
});
