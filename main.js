     // Performance monitoring
      if ('performance' in window && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log(`${entry.name}: ${entry.startTime}`, entry);
          }
        });
        observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
      }

      // Register modal functionality
      document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('registrationModal');
        const registerBtn = document.querySelector('.register-button');
        const closeBtn = document.querySelector('.close-button');
        const phoneInput = document.getElementById('phoneNumber');

        // Open modal
        registerBtn.addEventListener('click', function(e) {
          e.preventDefault();
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        });

        // Close modal
        closeBtn.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
          if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
          }
        });

        // Phone number formatting
        if (phoneInput) {
          phoneInput.addEventListener('input', formatPhoneNumber);

          function formatPhoneNumber(e) {
            let input = e.target.value.replace(/\D/g, '');

            // Add Uzbekistan code if not present
            if (!input.startsWith('998') && input.length > 0) {
              if (input.startsWith('9') && input.length >= 1) {
                input = '998' + input.substring(1);
              } else {
                input = '998' + input;
              }
            }

            // Format the number
            let formatted = '';
            if (input.length > 0) {
              formatted = '+' + input.substring(0, 3);
              if (input.length > 3) {
                formatted += ' ' + input.substring(3, 5);
              }
              if (input.length > 5) {
                formatted += ' ' + input.substring(5, 8);
              }
              if (input.length > 8) {
                formatted += ' ' + input.substring(8, 10);
              }
              if (input.length > 10) {
                formatted += ' ' + input.substring(10, 12);
              }
            }

            e.target.value = formatted;
          }
        }

        // Form submission
        const form = document.getElementById('registrationForm');
        if (form) {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData.entries());

            if (formValues.fullName && formValues.phoneNumber) {
              const modalContent = document.querySelector('.modal-content');
              modalContent.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 20px 0;">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px;">
                    <circle cx="12" cy="12" r="12" fill="#2ECC71"/>
                    <path d="M7 12L10 15L17 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <h2 style="font-size: 24px; margin-bottom: 15px; color: #333;">Tabriklaymiz!</h2>
                  <p style="color: #666; margin-bottom: 10px;">Siz muvaffaqiyatli ro'yxatdan o'tdingiz.</p>
                  <p style="color: #666; margin-bottom: 10px;">Dars haqida batafsil ma'lumot tez orada sizning telefon raqamingizga yuboriladi.</p>
                  <button class="close-success-button" style="background-color: #C92A2A; color: #fff; border: none; padding: 12px 30px; border-radius: 5px; font-weight: 600; margin-top: 20px; cursor: pointer;">Yopish</button>
                </div>
              `;

              document.querySelector('.close-success-button').addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
              });
            }
          });
        }
      });