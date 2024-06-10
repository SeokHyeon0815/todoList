/* 리스트 추가 */
let addBtn = document.querySelector(".add_btn"); // 버튼요소

//추가 버튼 누르면 리스트 항목이 추가된다
/* 
        문제점 1 : 리스트 항목 다 삭제하고 다시 추가할때 id값은 계속 늘어난다 초기화가 필요해보인다.
                    => 삭제시 id 값 초기화
        
        문제점2 : ul 없을때 ul를 만드는 방식인데
            다 삭제를 하고 나면 uㅣ은 남아잇다
            그럼 어떻게 하느냐?.. ==> li 갯수 확인후 없으면 ul도 같이 삭제 !! 해결
            
*/

let flag = false;
let id_count = 0;
let user_text; //사용자 텍스트 변수

/* form요소 전체를 제출 방지 해야한다  ==> 그렇지 않으면 enterkey 사용시 새로고침된다. */
let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // 폼 제출을 방지
});
// enterKey 사용시 리스트 추가
let input = document.getElementById("text"); // 사용자 텍스트
input.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    // 폼 제출 을 방지
    event.preventDefault();
    // 버튼 클릭 호출
    addBtn.click();
  }
});

addBtn.addEventListener("click", function () {
  user_text = document.getElementById("text").value; // 사용자가 적은 텍스트
  let after_txt = ` 
      <li id=${id_count}><p>${user_text}</p>
      <button class="delete_btn"><p>삭 제</p></button>
      </li>
    `;

  let frist_txt = `<ul>
    <li id=${id_count}><p>${user_text}</p>
    <button class="delete_btn"><p>삭 제</p></button></li></ul>
  `;
  if (flag === false) {
    document
      .querySelector(".list-wrap")
      //   자식 뒤에 요소 추가
      .insertAdjacentHTML("beforeend", frist_txt);
    click_check(document.getElementById(id_count));
  } else {
    document
      .querySelector(".list-wrap ul")
      .insertAdjacentHTML("beforeend", after_txt);
    click_check(document.getElementById(id_count));
  }
  //
  // 삭제함수 적용하기 ==> 해당 id값의 요소의 버튼요소를 찾아서 함수인수에 대입
  let deleteBtn = document
    .getElementById(id_count)
    .querySelector(".delete_btn");
  delete_item(deleteBtn);

  flag = true;
  id_count++; //id 값 증가
  //
  //   추가 클릭시 input창 초기화
  document.getElementById("text").value = "";
});

// 클릭시 해당 아이디값 표시
/*
    1. 클릭체크하는 함수 만들기
    2. 만들어진 list에 함수를 넣는다
    3. list 클릭시 함수(체크한지 안한지)가 실행된다
*/
// 클릭 두번 하면 풀림

// 클릭시 클래스 넣어서 css로 꾸미기
/* getElementById를 써서 클릭한 해당 id를 가져와 거기에 클래스 추가 */

/*
    1. 문제점 같은 리스트 항목을 누르는거 상관 없다 그러나
        첫번째 항목클릭하면 flag가 true로 되어진다 그러면 두번째 항목 클릭시 첫번째가 아닌 else 조건문이
        실행된다 --> 
        해결 : 클릭한 id의 클래스를 가져와서 클래스 네임 여부로 지우거나 생성한다
*/

let click_check = (item) => {
  item.addEventListener("click", function () {
    className = document.getElementById(`${item.id}`).className;
    if (className == "check") {
      document.getElementById(`${item.id}`).classList.remove("check");
    } else {
      document.getElementById(`${item.id}`).classList.add("check");
    }
  });
};

// 삭제 버튼 누를시 리스트 항목 삭제
/* 클릭하면 삭제되는 함수 만들기 */

let delete_item = (item) => {
  item.addEventListener("click", function (event) {
    // 이벤트 버블링을 막기 위해 클릭 이벤트를 상위 요소로 전달방지
    event.stopPropagation();
    // deleteBtn.closest('li')는 클릭된 버튼의 가장 가까운 "li" 조상 요소를 찾음 =>(closest)
    item.closest("li").remove();

    // li 갯수 확인후 없으면 ul도 같이 삭제
    let List_count = document.querySelector("ul").childElementCount;
    if (List_count == 0) {
      document.querySelector("ul").remove();
      //  ul없다고 다시 상태 바꿔주기
      flag = false;
      //   id 값 초기화
      id_count = 0;
    }
  });
};

/* 깃 허브 써보기   (05. 27)*/
