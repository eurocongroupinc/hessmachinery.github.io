document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(
    ".section, .card, .pill-card, .highlight-card, .careers-card, .contact-form-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
    }
  );

  revealEls.forEach((el) => {
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
    }
    observer.observe(el);
  });
});


// Scroll animation observer
document.querySelectorAll("section, .catalog-item").forEach(el=>{
  el.classList.add("reveal");
});

const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("in-view");
      obs.unobserve(e.target);
    }
  });
},{threshold:0.15});

document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

// PRODUCT DETAILS DATA
const productData = {
  "CNC Gantry Milling Machine": {
    desc: "High rigidity CNC gantry milling designed for precision heavy-duty machining.",
    specs: [
      "Bed length: 4–12 meters",
      "Spindle power: 25–40 kW",
      "Rapid feed: 12–20 m/min",
      "Position accuracy: ±0.01 mm"
    ],
    apps: [
      "Engine blocks",
      "Large plate machining",
      "Die & mold components"
    ]
  },
  "Automated Assembly Station": {
    desc: "Fully programmable robotic assembly with PLC-driven logic and safety interlocks.",
    specs: [
      "Cycle time: 5–12 seconds",
      "Integrated robotics: 6-axis",
      "Sensor monitoring: Real-time",
      "Quality rejection gates"
    ],
    apps: [
      "Automotive sub-assemblies",
      "Electronic module assembly",
      "Industrial automation cells"
    ]
  }
};

// Attach modal triggers
document.querySelectorAll(".catalog-item").forEach(card=>{
  card.addEventListener("click",()=>{
    const title = card.querySelector("h3").innerText;
    const modal=document.getElementById("product-modal");
    modal.style.display="flex";
    document.getElementById("modal-title").innerText=title;

    const d=productData[title];
    if(d){
      document.getElementById("modal-desc").innerText=d.desc;
      document.getElementById("modal-specs").innerHTML=d.specs.map(s=>"<li>"+s+"</li>").join("");
      document.getElementById("modal-apps").innerHTML=d.apps.map(a=>"<li>"+a+"</li>").join("");
    } else {
      document.getElementById("modal-desc").innerText="No additional details available.";
      document.getElementById("modal-specs").innerHTML="";
      document.getElementById("modal-apps").innerHTML="";
    }
  });
});

// close modal
document.querySelector(".modal-close").onclick=function(){
  document.getElementById("product-modal").style.display="none";
};
window.onclick=function(e){
  if(e.target.id==="product-modal") document.getElementById("product-modal").style.display="none";
};
