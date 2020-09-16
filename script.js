const submit = document.getElementById('submit');
const search = document.getElementById('search');
const resultHeading = document.getElementById('result-heading');
const resultContent = document.getElementById('result-content');

// 지역 검색 후 API에서 결과 가져옴
function searchRestaurant(e) {
  e.preventDefault();

  // 검색어 변수에 저장
  const term = search.value;

  if (term.trim()) {
    fetch(
      `https://cors-anywhere.herokuapp.com/http://211.237.50.150:7080/openapi/11ae7998f8ebf7af8ecdf1328368115cbec9ce4b163d3dcf512df6b98af95baf/json/Grid_20200713000000000605_1/1/999?RELAX_SI_NM=${term}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        resultHeading.innerHTML = `<h2>'${term}'지역의 안심식당 입니다:</h2>`;

        // 검색결과 array를 destrucuring후 정의한 array에 저장
        const { result, row } = data.Grid_20200713000000000605_1;
        let title = [],
          addr1 = [],
          addr2 = [],
          tel = [];
        for (let i = 0; i < row.length; i++) {
          title.push(row[i].RELAX_RSTRNT_NM);
          addr1.push(row[i].RELAX_ADD1);
          addr2.push(row[i].RELAX_ADD2);
          tel.push(row[i].RELAX_RSTRNT_TEL);
        }

        // 검색내용 없을경우 메시지 출력
        if (row.length < 1) {
          resultHeading.innerHTML = `<h2>검색결과가 없습니다. 다시 입력해주세요.</h2>`;
        } else {
          for (let item in row) {
            resultContent.innerHTML =
              '<div class="resultSubHead">상세정보(상호명, 주소, 연락처)</div>';
            resultContent.insertAdjacentHTML(
              'afterend',
              `<div class="resultItem">
                        <div class="title">${title[item]}</div>
                        <div class="addr">${addr1[item]}${addr2[item]}</div>
                        <div class="tel">${tel[item]}</div> 
                      </div>`
            );
          }
        }
      });
  } else {
    alert('검색어를 입력해 주세요');
  }
}

submit.addEventListener('submit', searchRestaurant);
