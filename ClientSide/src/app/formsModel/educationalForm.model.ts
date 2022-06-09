import { FormControl, FormGroup, Validators } from "@angular/forms";

export class EducationalFormControl extends FormControl{
    public label : string;
    public modelProperty : string;
    public type : string;
    constructor(label : string, property : string, value : any, type : any, validator : any){
        super(value, validator);
        this.label = label;
        this.modelProperty = property;
        this.type = type;
    }

    getValidationMessages(){
        let messages : string[] = [];
        if(this.errors){
            for(let errorName in this.errors){
                switch(errorName){
                    case "required":
                        messages.push(`You must enter a ${this.label}`)
                        break;
                    case "maxlength":
                        messages.push(`A ${this.label} must be less than ${this.errors['maxlength'].requiredLength}`)
                        break;
                    case "minlength":
                        messages.push(`A ${this.label} must be more than ${this.errors['maxlength'].requiredLength}`)
                        break;
                }
            }
        }
        return messages;
    }
}

export class EducationalFormGroup extends FormGroup{
    constructor() {
        super({
            id : new EducationalFormControl("Id", "id", "", "number", Validators.maxLength(100)),
            employeeId : new EducationalFormControl("EmployeeId", "employeeId", "", "number", Validators.required),
            highestDegree : new EducationalFormControl("Highest Degree", "highestDegree", "", "text", Validators.compose([Validators.required, Validators.maxLength(3)])),
            subject : new EducationalFormControl("Subject", "subject", "", "text", Validators.required),
            passingYear : new EducationalFormControl("Passing Year", "passingYear", "", "number", Validators.required),
            cgpa : new EducationalFormControl("CGPA", "cgpa", "", "number", Validators.required),
            training : new EducationalFormControl("Training", "training", "", "text", Validators.required),
            duration : new EducationalFormControl("Duration", "duration", "", "text", Validators.required)
        });
        
    }

    get educationalControl() : EducationalFormControl[]{
        return Object.keys(this.controls).map(e => this.controls[e] as EducationalFormControl);
    }

    getformValidationMessage(form : any) : string[]{
        let messages : string[] = [];
        this.educationalControl.forEach(e => e.getValidationMessages().forEach(e => messages.push(e)));
        return messages;
    }
}