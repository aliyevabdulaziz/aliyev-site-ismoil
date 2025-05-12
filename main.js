// Modal functionality
document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('registrationModal');
	const registerBtn = document.querySelector('.register-button');
	const closeButton = document.querySelector('.close-button');
	const registrationForm = document.getElementById('registrationForm');
	const phoneInput = document.getElementById('phoneNumber');

	// Open modal when button is clicked
	registerBtn.addEventListener('click', function (e) {
		e.preventDefault();
		modal.style.display = 'flex';
		document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
	});

	// Close modal when X is clicked
	closeButton.addEventListener('click', function () {
		modal.style.display = 'none';
		document.body.style.overflow = 'auto'; // Re-enable scrolling
	});

	// Close modal when clicking outside the modal content
	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			modal.style.display = 'none';
			document.body.style.overflow = 'auto'; // Re-enable scrolling
		}
	});

	// Phone number formatting
	phoneInput.addEventListener('input', formatPhoneNumber);
	phoneInput.addEventListener('keydown', function (e) {
		// Allow: backspace, delete, tab, escape, enter
		if (
			[46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
			// Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
			(e.keyCode === 65 && e.ctrlKey === true) ||
			(e.keyCode === 67 && e.ctrlKey === true) ||
			(e.keyCode === 86 && e.ctrlKey === true) ||
			(e.keyCode === 88 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)
		) {
			// Let it happen, don't do anything
			return;
		}

		// Ensure that it is a number and stop the keypress if not
		if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});

	// Format phone number as user types
	function formatPhoneNumber(e) {
		// Get input value and remove all non-digit characters
		let input = e.target.value.replace(/\D/g, '');

		// Ensure the input starts with 998 (Uzbekistan code)
		if (!input.startsWith('998') && input.length > 0) {
			if (input.startsWith('9') && input.length >= 1) {
				input = '998' + input.substring(1);
			} else {
				input = '998' + input;
			}
		}

		// Format the number according to Uzbekistan format: +998 XX XXX XX XX
		let formattedNumber = '';
		if (input.length > 0) {
			formattedNumber = '+' + input.substring(0, 3);

			if (input.length > 3) {
				formattedNumber += ' ' + input.substring(3, 5);
			}

			if (input.length > 5) {
				formattedNumber += ' ' + input.substring(5, 8);
			}

			if (input.length > 8) {
				formattedNumber += ' ' + input.substring(8, 10);
			}

			if (input.length > 10) {
				formattedNumber += ' ' + input.substring(10, 12);
			}
		}

		// Update the input value with the formatted number
		e.target.value = formattedNumber;
	}

	// Set initial value for phone input
	window.addEventListener('DOMContentLoaded', function () {
		phoneInput.value = '+998 ';
	});

	// Form submission
	registrationForm.addEventListener('submit', function (e) {
		e.preventDefault();

		// Here you would typically send the form data to a server
		// For this example, we'll just show a success message

		const formData = new FormData(registrationForm);
		const formValues = Object.fromEntries(formData.entries());

		// Simple validation
		if (formValues.fullName && formValues.phoneNumber) {
			// Replace form with success message
			const modalContent = document.querySelector('.modal-content');
			modalContent.innerHTML = `
                <div class="success-message">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px;">
                        <circle cx="12" cy="12" r="12" fill="#2ECC71"/>
                        <path d="M7 12L10 15L17 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h2>Tabriklaymiz!</h2>
                    <p>Siz muvaffaqiyatli ro'yxatdan o'tdingiz.</p>
                    <p>Dars haqida batafsil ma'lumot tez orada sizning telefon raqamingizga yuboriladi.</p>
                    <button class="close-success-button">Yopish</button>
                </div>
            `;

			// Add event listener to the new close button
			document.querySelector('.close-success-button').addEventListener('click', function () {
				modal.style.display = 'none';
				document.body.style.overflow = 'auto'; // Re-enable scrolling
			});
		}
	});
});


if ('performance' in window && 'PerformanceObserver' in window) {
	const observer = new PerformanceObserver(list => {
		for (const entry of list.getEntries()) {
			// Log LCP, FID, CLS metrics
			console.log(`${entry.name}: ${entry.startTime}`, entry);
		}
	});
	observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
}