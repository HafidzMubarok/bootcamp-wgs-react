import EmployeeStyles from "./style/EmployeeStyle";
import { Form, Field } from "react-final-form";

const EmployeeForm = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };
  
    const expretises = [
        { name: "HTML", value: "html" },
        { name: "CSS", value: "css" },
        { name: "JavaScript", value: "javascript" },
        { name: "NodeJS", value: "nodejs" },
        { name: "ReactJS", value: "reactjs" },
    ]
    const educations = [
        { name: "High School", value: "highschool" },
        { name: "Bachelor's", value: "bachelor" },
        { name: "Master's", value: "master" },
        { name: "PhD", value: "phd" },
    ];
    const preferences = [
        { name: "Frontend", value: "frontend" },
        { name: "Backend", value: "backend" },
        { name: "Fullstack", value: "fullstack" },
    ];

  return (
    <EmployeeStyles>
      <h1>React Final Form - Employee Information</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: false, education: "highschool" }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label>Employed</label>
              <Field name="employed" component="input" type="checkbox" />
            </div>
            <div>
              <label>Education</label>
              <Field name="education" component="select">
                {educations.map(education => (
                    <option value={education.value}>{education.name}</option>
                ))}
              </Field>
            </div>
            <div>
              <label>Expertise</label>
              <div>
                {expretises.map(expretise => (
                    <label>
                    <Field
                        name="expertise"
                        component="input"
                        type="checkbox"
                        value={expretise.value}
                    />{" "}
                    {expretise.name}
                    </label>
                ))}
              </div>
            </div>
            <div>
              <label>Preferred Technology</label>
              <Field name="preferredTechnology" component="select">
                {preferences.map(preference => (
                    <option value={preference.value}>{preference.name}</option>
                ))}
              </Field>
            </div>
            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes" />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </EmployeeStyles>
  );
};

export default EmployeeForm;