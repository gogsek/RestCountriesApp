let container = document.getElementById('countries');

async function loadCountries() {
    // Definujeme proměnnou html uvnitř funkce, aby se při opakovaném volání nezdvojovala
    let html = ``;
    const url = "countries.json";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const countries = await response.json();

        countries.forEach(country => {
            const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
            const currencies = country.currencies ? Object.values(country.currencies)
                .map(currency => `${currency.name} (${currency.symbol})`)
                .join(', ') : 'N/A';
            // Oprava pro capital: join() lze volat jen na poli
            const capital = country.capital && Array.isArray(country.capital) ? country.capital.join(', ') : 'N/A';

            // --- ZMĚNA STRUKTURY ZDE ---
            html += `
                <div class="country-card">
                    <h2 class="card-title card-title-top">${country.name.common}</h2>

                    <div class="card-image">
                        <img src="${country.flags.png}" alt="Vlajka ${country.name.common}"/>
                    </div>
                    
                    <div class="card-content">
                        <div class="card-info">
                            <p><strong>Official name:</strong> ${country.name.official}</p>
                            <p><i class="fa fa-bank" style="font-size:24px"></i> <strong> Capital city:</strong> ${capital}</p>
                            <p><i class="fa fa-male" style="font-size:32px"></i> <strong> Population:</strong> ${country.population.toLocaleString()}</p>
                            <p><i class="fa fa-globe" style="font-size:24px"></i> <strong> Region:</strong> ${country.region}</p>
                            <p><i class="fa fa-arrows-alt" style="font-size:24px"></i> <strong> Area size:</strong> ${country.area.toLocaleString()} km²</p>
                            <p><i class="fa fa-language" style="font-size:24px"></i> <strong> Language:</strong> ${languages}</p>
                            <p><i class="fa fa-money" style="font-size:24px"></i> <strong> Currency:</strong> ${currencies}</p>
                            <p><i class="fa fa-clock-o" style="font-size:24px"></i> <strong> Time zone:</strong> ${country.timezones.join(', ')}</p>
                        </div>
                    </div>
                </div>
            `;
            // --- KONEC ZMĚNY ---
        });

        container.innerHTML = html;

    } catch (error) {
        console.error("Chyba při načítání:", error.message);
        container.innerHTML = `<p class="error">Nepodařilo se načíst data o zemích.</p>`;
    }
}

loadCountries();