function inputRemoveFocus() {
  const input = document.querySelector("#memo-input");
  input.blur();
}

// 메모 한줄 dom에 그려주기
function displayMemo(memo) {
  const memoUl = document.querySelector("#memo-ul");
  const memoLi = document.createElement("li");
  const btnEdit = document.createElement("button");
  const btnDelete = document.createElement("button");
  memoLi.innerText = `[id:${memo.id}] [${memo.content}] `;

  btnEdit.innerText = "수정";
  btnEdit.addEventListener("click", editMemo);
  btnEdit.dataset.id = memo.id;

  btnDelete.innerText = "삭제";
  btnDelete.addEventListener("click", deleteMemo);
  btnDelete.dataset.id = memo.id;

  memoUl.appendChild(memoLi);
  memoLi.appendChild(btnEdit);
  memoLi.appendChild(btnDelete);
}

// CRUD 중 Delete!
async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });

  readMemo();
  inputRemoveFocus();
}

// CRUD 중 Read!
async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const memoUl = document.querySelector("#memo-ul");
  memoUl.innerText = "";
  //jsonRes = [{id:123,content:'블라블라'}]
  //['a','b','c'].forEach(function); 0 번째 index (펑션) 실행,  1번째 index (펑션) 실행
  jsonRes.forEach(displayMemo);
}

// CRUD 중 Create!
async function createMemo(value) {
  // const res = await fetch("/memos"); -> 이건 get 요청이잖아, 값을 update 하려면
  // POST 요청을 받아야해 fetch("해당주소",{여기에 아래처럼 header:{}, body:{} 써줘야해  })
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //JSON.stringify ?란   통신할때는 문자열 형태로 주고받아야해서 쓰는거야
      id: new Date().getTime(),
      content: value,
    }),
  }); //아무것도 안써주면 get으로 요청
  //   const jsonRes = await res.json();
  //   console.log(jsonRes);
  readMemo();
}

// CRUD 중 Update!
async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 입력값을 주세요");

  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
  inputRemoveFocus();
}

function handleSubmit(event) {
  // form은 값을 보낸후 redirect(새로고침)되는 현상이있음. event.preventDefault
  event.preventDefault();

  const input = document.querySelector("#memo-input");

  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
readMemo();
