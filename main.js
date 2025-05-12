document.addEventListener('DOMContentLoaded', function () {
	const e = document.getElementById('registrationModal'),
		t = document.querySelector('.register-button'),
		n = document.querySelector('.close-button'),
		o = document.getElementById('registrationForm'),
		a = document.getElementById('phoneNumber');
	t.addEventListener('click', function (t) {
		t.preventDefault(), (e.style.display = 'flex'), (document.body.style.overflow = 'hidden');
	}),
		n.addEventListener('click', function () {
			(e.style.display = 'none'), (document.body.style.overflow = 'auto');
		}),
		window.addEventListener('click', function (t) {
			t.target === e && ((e.style.display = 'none'), (document.body.style.overflow = 'auto'));
		}),
		a.addEventListener('input', r),
		a.addEventListener('keydown', function (e) {
			if (
				!(
					[46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
					(65 === e.keyCode && !0 === e.ctrlKey) ||
					(67 === e.keyCode && !0 === e.ctrlKey) ||
					(86 === e.keyCode && !0 === e.ctrlKey) ||
					(88 === e.keyCode && !0 === e.ctrlKey) ||
					(e.keyCode >= 35 && e.keyCode <= 39)
				)
			)
				if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) e.preventDefault();
		});
	function r(e) {
		let t = e.target.value.replace(/\D/g, '');
		if (!t.startsWith('998') && t.length > 0)
			if (t.startsWith('9') && t.length >= 1) t = '998' + t.substring(1);
			else t = '998' + t;
		let n = '';
		t.length > 0 &&
			((n = '+' + t.substring(0, 3)),
			t.length > 3 && (n += ' ' + t.substring(3, 5)),
			t.length > 5 && (n += ' ' + t.substring(5, 8)),
			t.length > 8 && (n += ' ' + t.substring(8, 10)),
			t.length > 10 && (n += ' ' + t.substring(10, 12))),
			(e.target.value = n);
	}
	window.addEventListener('DOMContentLoaded', function () {
		a.value = '+998 ';
	}),
		o.addEventListener('submit', function (t) {
			t.preventDefault();
			const n = new FormData(o),
				a = Object.fromEntries(n.entries());
			if (a.fullName && a.phoneNumber) {
				const t = document.querySelector('.modal-content');
				(t.innerHTML =
					'\n                <div class="success-message">\n                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px;">\n                        <circle cx="12" cy="12" r="12" fill="#2ECC71"/>\n                        <path d="M7 12L10 15L17 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n                    </svg>\n                    <h2>Tabriklaymiz!</h2>\n                    <p>Siz muvaffaqiyatli ro\'yxatdan o\'tdingiz.</p>\n                    <p>Dars haqida batafsil ma\'lumot tez orada sizning telefon raqamingizga yuboriladi.</p>\n                    <button class="close-success-button">Yopish</button>\n                </div>\n            '),
					document.querySelector('.close-success-button').addEventListener('click', function () {
						(e.style.display = 'none'), (document.body.style.overflow = 'auto');
					});
			}
		});
});
