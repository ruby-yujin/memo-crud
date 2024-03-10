// 메모 한개
function displayMemo(memo) {
  const memoUl = document.querySelector("#memo-ul");
  const memoLi = document.createElement("li");
  memoLi.innerText = `[id:${memo.id}] [${memo.content}] `;
  memoUl.appendChild(memoLi);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const memoUl = document.querySelector("#memo-ul");
  memoUl.innerText = "";
  //jsonRes = [{id:123,content:'블라블라'}]
  //['a','b','c'].forEach(function); 0 번째 index (펑션) 실행,  1번째 index (펑션) 실행
  jsonRes.forEach(displayMemo);
}

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
