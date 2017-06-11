(function(){

  var initTimerId;

  var fieldsLoaded = function(){
    var buttonContainer = document.querySelector("div.buttons-container");
    if(buttonContainer){
      return true;
    }else{
      return false;
    }
  }

  var sortFieldsInSteps = function(){
    var fields = document.querySelectorAll(".field-group");
    var wizardSteps = [];
    Array.prototype.forEach.call(fields, function(field){
      console.log(field);
      var descriptionParagraph = field.querySelector(".description p");
      if(descriptionParagraph){
        //test to see if there is the specific tag in field description
        var matches = descriptionParagraph.textContent.match(/@@(.*)@@/i)
        if(matches){
          console.log("found Wizard Step Title : " + matches[1]);
          //remove the tag from description
          descriptionParagraph.textContent = descriptionParagraph.textContent.replace(/@@(.*)@@/i, "");

          //test if wizard step is not know yet
          var step = wizardSteps.find(function(step){ return step.name == matches[1];});
          if(!step){
            step = {"name" : matches[1], "fields" : []};
            wizardSteps.push(step);
          }

          //append it to that step
          step.fields.push(field);
        }else{
          //show the field
          field.style.display = 'block';
        }
      }
    });

    return wizardSteps;
  }

  var reLayoutFields = function(wizardSteps){

    console.log(wizardSteps);

    var requestForm = document.querySelector("form");
    var nativeButtons = document.querySelector("form div.buttons");

    wizardSteps.forEach(function(step,index,steps){

      var stepDiv = document.createElement("div");
      var stepTitle = document.createElement("h3");

      stepTitle.textContent = step.name;
      stepDiv.appendChild(stepTitle);
      requestForm.appendChild(stepDiv);
      step.fields.forEach(function(field){
        stepDiv.appendChild(field);
        field.style.display = 'block';
      });

      var stepButtons = document.createElement("div");
      stepButtons.classList.add("buttons");

      console.log("processing step index : " + index);


      if(index == steps.length -1){

        var stepPrevious = document.createElement("button");
        stepPrevious.classList.add("aui-button", "aui-button-link");
        stepPrevious.textContent = "Précédent";

        nativeButtons.insertBefore(stepPrevious,nativeButtons.querySelector("div"));


        stepDiv.appendChild(nativeButtons);

      }else{

        var stepNext = document.createElement("button");
        stepNext.classList.add("aui-button", "aui-button-primary");
        stepNext.textContent = "Suivant";
        stepButtons.appendChild(stepNext);

        if(index != 0){
          var stepPrevious = document.createElement("button");
          stepPrevious.classList.add("aui-button", "aui-button-link");
          stepPrevious.textContent = "Précédent";
          stepButtons.appendChild(stepPrevious);
        }

        stepDiv.appendChild(stepButtons);

      }
      



    });


  }

  var initView = function(){
    if(fieldsLoaded()){
      console.log("trying to setup display");
      window.clearInterval(initTimerId);
      reLayoutFields(sortFieldsInSteps());
    }
  }


  window.addEventListener("load",function(){
    console.log("jsd-wizard plugin fired up !");
    initTimerId = window.setInterval(initView, 100);
  });
})();
