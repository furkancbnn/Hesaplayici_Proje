const harcamaInput = document.querySelector("#harcamaInput");
const fiyatInput = document.querySelector("#fiyatInput");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");

// izleme işlemleri
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("click", handleFilter);
// state'i oluştur (durum)
let toplam = 0;

function updateToplam(fiyat) {
   toplam += Number(fiyat);
   toplamBilgi.innerText = toplam;
}

// harcma oluşturma
function addExpense(e) {
   e.preventDefault();

   // doğrulama yapma
   if (!fiyatInput.value || !harcamaInput.value) {
      alert("Formları Doldurun");
      return;
   }

   // div oluşrtma
   const harcamaDiv = document.createElement(`div`);

   // class ekleme
   harcamaDiv.classList.add("harcama");
   if (statusCheck.checked) {
      harcamaDiv.classList.add("payed");
   }

   // içerik
   harcamaDiv.innerHTML = `
   <h2>${harcamaInput.value}</h2>
   <h2 id="value">${fiyatInput.value}</h2>
   <div class="buttons">
      <img id="payment" src="images/payment-100.png" alt="" />
      <img id="remove" src="images/delete-48.png" alt="" />
   </div>
   `;

   liste.appendChild(harcamaDiv);

   // update güncellem
   updateToplam(fiyatInput.value);

   // form temizleme
   harcamaInput.value = "";
   fiyatInput.value = "";
}

// ! liste tıklama olayları yönetimi
function handleClick(e) {
   // tıklanılan elemanı alma
   const element = e.target;

   if (element.id === "remove") {
      // tıklanılan sil butonunun kapsayıcısını alma
      const wrapperElement = element.parentElement.parentElement;

      // silinen elemanın fiyatını alma
      const deletedPrice = wrapperElement.querySelector("#value").innerText;

      // silinenin fiyatını toplamdan çıkarma
      updateToplam(-Number(deletedPrice));

      // kapsayıcıyı htmlden kaldırma
      wrapperElement.remove();
   }
}

function handleFilter(e) {
   const items = liste.childNodes;
   items.forEach((item) => {
      switch (e.target.value) {
         case "all":
            item.style.display = "flex";
            break;

         case "payed":
            if (!item.classList.contains("payed")) {
               item.style.display = "none";
            } else {
               item.style.display = "flex";
            }
            break;

         case "not-payed":
            if (item.classList.contains("payed")) {
               item.style.display = "none";
            } else {
               item.style.display = "flex";
            }
            break;
      }
   });
}
