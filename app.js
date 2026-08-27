const KEY="student_register_data";
let students=JSON.parse(localStorage.getItem(KEY)||"[]");

const $=id=>document.getElementById(id);
const form=$("studentForm");

function save(){localStorage.setItem(KEY,JSON.stringify(students));}
function toast(msg){const t=$("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",2200)}

function render(){
  const q=$("search").value.toLowerCase().trim();
  const rows=students.filter(s=>[s.name,s.email,s.course,s.phone].join(" ").toLowerCase().includes(q));
  $("studentTable").innerHTML=rows.map(s=>`
    <tr>
      <td>${esc(s.name)}</td><td>${esc(s.email)}</td><td>${esc(s.phone)}</td>
      <td>${esc(s.course)}</td><td>${esc(s.year)}</td><td>${esc(s.gender)}</td>
      <td><div class="actions">
        <button class="secondary" onclick="editStudent('${s.id}')">Edit</button>
        <button class="danger" onclick="deleteStudent('${s.id}')">Delete</button>
      </div></td>
    </tr>`).join("");
  $("empty").style.display=rows.length?"none":"block";
  $("totalStudents").textContent=students.length;
  $("maleStudents").textContent=students.filter(s=>s.gender==="Male").length;
  $("femaleStudents").textContent=students.filter(s=>s.gender==="Female").length;
}

function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

form.addEventListener("submit",e=>{
  e.preventDefault();
  const id=$("studentId").value;
  const student={
    id:id||crypto.randomUUID(),name:$("name").value.trim(),email:$("email").value.trim(),
    phone:$("phone").value.trim(),dob:$("dob").value,gender:$("gender").value,
    course:$("course").value,year:$("year").value,address:$("address").value.trim()
  };
  if(id) students=students.map(s=>s.id===id?student:s),toast("Student updated");
  else students.unshift(student),toast("Student registered");
  save();form.reset();$("studentId").value="";$("formTitle").textContent="Register Student";
  $("saveBtn").textContent="Register Student";$("cancelEdit").classList.add("hidden");render();
});

window.editStudent=id=>{
  const s=students.find(x=>x.id===id); if(!s)return;
  $("studentId").value=s.id;$("name").value=s.name;$("email").value=s.email;$("phone").value=s.phone;
  $("dob").value=s.dob;$("gender").value=s.gender;$("course").value=s.course;$("year").value=s.year;$("address").value=s.address;
  $("formTitle").textContent="Edit Student";$("saveBtn").textContent="Update Student";$("cancelEdit").classList.remove("hidden");
  scrollTo({top:0,behavior:"smooth"});
};

window.deleteStudent=id=>{
  const s=students.find(x=>x.id===id);
  if(s&&confirm(`Delete ${s.name}?`)){students=students.filter(x=>x.id!==id);save();render();toast("Student deleted");}
};

$("cancelEdit").onclick=()=>{form.reset();$("studentId").value="";$("formTitle").textContent="Register Student";$("saveBtn").textContent="Register Student";$("cancelEdit").classList.add("hidden")};
$("search").addEventListener("input",render);

$("exportBtn").onclick=()=>{
  if(!students.length)return toast("No students to export");
  const headers=["Name","Email","Phone","DOB","Gender","Course","Year","Address"];
  const csv=[headers,...students.map(s=>[s.name,s.email,s.phone,s.dob,s.gender,s.course,s.year,s.address])]
    .map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(",")).join("\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  a.download="students.csv";a.click();URL.revokeObjectURL(a.href);
};
render();
