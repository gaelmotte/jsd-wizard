(function(){

  var timers={
    initTimerId: null,
    errorsLookupTimerId : null
  }
  var theForm = null;

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
      var descriptionParagraph = field.querySelector(".description p");
      if(descriptionParagraph){
        //test to see if there is the specific tag in field description
        var matches = descriptionParagraph.textContent.match(/@@(.*)@@/i)
        if(matches){
          console.log("found Wizard Step Title : " + matches[1]);
          //remove the tag from description
          descriptionParagraph.innerHTML = descriptionParagraph.innerHTML.replace(/@@(.*)@@/i, "");

          //test if wizard step is not know yet
          var step = wizardSteps.filter(function(step){ return step.name == matches[1];})[0];
          if(!step){
            step = {"name" : matches[1], "fields" : []};
            wizardSteps.push(step);
          }

          //append it to that step
          step.fields.push(field);
        }
      }
    });

    return wizardSteps;
  }

  var reLayoutFields = function(wizardSteps){

    var requestForm = document.querySelector("form");
    var nativeButtons = document.querySelector("form div.buttons");


    wizardSteps.forEach(function(step,index,steps){

      var stepDiv = document.createElement("div");
      stepDiv.classList.add("wizard-step");
      var stepTitle = document.createElement("h3");

      stepTitle.textContent = AJS.I18n.getText("com.lab333.jsdwizard.step.titlelabel") + (index +1) + " / " + steps.length + " : " +step.name;
      stepDiv.appendChild(stepTitle);
      requestForm.appendChild(stepDiv);
      step.fields.forEach(function(field){
        stepDiv.appendChild(field);
      });

      var stepButtons = document.createElement("div");
      stepButtons.classList.add("buttons");


      if(index == steps.length -1){

        var stepPrevious = document.createElement("button");
        stepPrevious.classList.add("aui-button");
        stepPrevious.classList.add("aui-button-link");
        stepPrevious.textContent = AJS.I18n.getText("com.lab333.jsdwizard.step.previous");

        stepPrevious.addEventListener("click",function(e){
          displayedStep--;
          displayCurrentStep();
          e.preventDefault();
        });

        nativeButtons.insertBefore(stepPrevious,nativeButtons.querySelector("div"));


        stepDiv.appendChild(nativeButtons);

      }else{

        var stepNext = document.createElement("button");
        stepNext.classList.add("aui-button");
        stepNext.textContent = AJS.I18n.getText("com.lab333.jsdwizard.step.next");

        stepNext.addEventListener("click",function(e){
          displayedStep++;
          displayCurrentStep();
          e.preventDefault();
        });

        stepButtons.appendChild(stepNext);

        if(index != 0){
          var stepPrevious = document.createElement("button");
          stepPrevious.classList.add("aui-button");
          stepPrevious.classList.add("aui-button-link");
          stepPrevious.textContent = AJS.I18n.getText("com.lab333.jsdwizard.step.previous");

          stepPrevious.addEventListener("click",function(e){
            displayedStep--;
            displayCurrentStep();
            e.preventDefault();
          });
          stepButtons.appendChild(stepPrevious);
        }

        stepDiv.appendChild(stepButtons);

      }
      
    });
  }

  var displayCurrentStep = function(){
    var stepsDivs = document.querySelectorAll(".wizard-step");
    if(stepsDivs.length > 0){
      Array.prototype.forEach.call(stepsDivs, function(elem){elem.style.display = 'none';});
      stepsDivs[displayedStep].style.display='block';
      //TODO consider scrolling to the title of that step
    }
  }

  var foundError = false;

  var lookupErrors = function(){
    if(!foundError){
      stepsDivs = document.querySelectorAll(".wizard-step");
      for(var i = 0; i < stepsDivs.length; i++ ){
        var error = stepsDivs[i].querySelector("div.error");
        if(error){
          foundError = true;
          displayedStep = i;
          displayCurrentStep();
          return;
        }
      }
    }
  }

  var revealForm = function(){
    document.querySelector(".vp-request-form").style.display = "block";
  }


  var initView = function(){
    if(fieldsLoaded()){
      window.clearInterval(timers.initTimerId);
      reLayoutFields(sortFieldsInSteps());
      revealForm();
      displayedStep = 0;
      displayCurrentStep();

      document.querySelector("input[type=submit]").addEventListener("click", function(){foundError = false;});
      timers.errorsLookupTimerId = window.setInterval(lookupErrors,100);
    }
  }



  var fireUp = function(){
    var form = document.querySelector(".vp-request-form");
    if(form && form != theForm){
      theForm = form;
      timers.initTimerId = window.setInterval(initView, 100);
    }
  }

  setInterval(fireUp,100);


})();
