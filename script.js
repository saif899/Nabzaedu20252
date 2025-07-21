<script>
  function goToSection(sectionNumber) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById('section' + sectionNumber).style.display = 'block';
  }

  function showResults() {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById('resultSection').style.display = 'block';

    // اجمع البيانات
    let interests = [];
    for (let i = 1; i <= 15; i++) {
      let answer = document.querySelector(`input[name="q${i}"]:checked`);
      if (answer) interests.push(answer.value);
    }

    let learnStyles = [];
    for (let i = 1; i <= 3; i++) {
      let answer = document.querySelector(`input[name="l${i}"]:checked`);
      if (answer) learnStyles.push(answer.value);
    }

    let hobbies = [];
    document.querySelectorAll('input[name="hobby"]:checked').forEach(cb => hobbies.push(cb.value));

    // تحليل مبدئي (بسيط جداً لغرض النموذج فقط)
    const suggestionsMap = {
      'رسم': 'فنون جميلة',
      'كتابة': 'إعلام',
      'تكنولوجيا': 'علوم حاسب',
      'رياضة': 'تربية رياضية',
      'تواصل': 'تجارة',
      'تحليل': 'هندسة',
      'موسيقى': 'تربية موسيقية',
      'تصوير': 'فنون تطبيقية',
      'خدمة': 'طب أو خدمة اجتماعية'
    };

    const chosen = [];
    for (let hobby of hobbies) {
      let field = suggestionsMap[hobby];
      if (field && !chosen.includes(field)) chosen.push(field);
      if (chosen.length === 3) break;
    }

    // عرض النتيجة
    document.getElementById("resultText").innerText = `ميولك بتوضح إنك تميل إلى: ${hobbies.join(", ")}.\nوبتحب تتعلم بالطريقة: ${learnStyles.join(" / ")}.\n`;

    // التخصصات المقترحة
    const suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = "";
    for (let field of chosen) {
      let file = `${field.replace(/ /g, "_")}.html`;
      suggestionsDiv.innerHTML += `
        <div style="background: #f5f5f5; padding: 15px; border-radius: 10px;">
          <strong>${field}</strong><br>
          <a href="${file}" style="margin-top: 8px; display: inline-block; background: #6c63ff; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none;">خد نبذة</a>
        </div>`;
    }
  }
</script>