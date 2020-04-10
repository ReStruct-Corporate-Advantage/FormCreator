const SectionAttributeMap = {
  Provider: {
    ClassificationName: "Provider Info:",
    ClassificationDesc: "Contains submitter information",
    attributes: [
      {
        attributeType: "_TextInput",
        name: "Submitter:",
        placeholder: "Submitter SID",
        starVal: "*"
      },
      {
        attributeType: "_SingleSelectDropdown",
        name: "Submitter LOB",
        options: ["CIB", "CCB", "CB"],
        placeholder: "Submitter Line of Buisness",
        starVal: "*"
      },
      {
        attributeType: "_DateInput",
        name: "Date Submitted",
        placeholder: "Insert date here",
        starVal: "*"
      },
      {
        attributeType: "_MultiSelectDropdown",
        name: "Select LoB",
        options: ["CIB", "CCB", "CB"],
        placeholder: "Select LoB",
        starVal: "*"
      }
    ]
  },
  General: {
    ClassificationName: "General Info:",
    ClassificationDesc: "Contains general information",
    attributes: [
      {
        attributeType: "_TextInput",
        name: "Process Name:",
        placeholder: "Process Name",
        starVal: "*"
      },
      {
        attributeType: "_TextInput",
        name: "Process Desc",
        placeholder: "Process Desc",
        starVal: "*"
      },
      {
        attributeType: "_MultiSelectDropdown",
        name: "Select LoB",
        options: ["CIB", "CCB", "CB"],
        placeholder: "Select LoB",
        starVal: "*"
      }
    ]
  },
  Risk: {
    ClassificationName: "Risk Info:",
    ClassificationDesc: "Contains Risk information",
    attributes: [
      {
        attributeType: "_TextInput",
        name: "Submitter:",
        placeholder: "Submitter SID",
        starVal: "*"
      },
      {
        attributeType: "_SingleSelectDropdown",
        name: "Submitter LOB",
        options: ["CIB", "CCB", "CB"],
        placeholder: "Submitter Line of Buisness",
        starVal: "*"
      },
      {
        attributeType: "_DateInput",
        name: "Date Submitted",
        placeholder: "Insert date here",
        starVal: "*"
      }
    ]
  },
  new: {
    ClassificationName: "NEW SECTION:",
    ClassificationDesc: "Contains Risk information",
    attributes: [
      {
        attributeType: "_TextInput",
        name: "Submitter:",
        placeholder: "Submitter SID",
        starVal: "*"
      },
      {
        attributeType: "_SingleSelectDropdown",
        name: "Submitter LOB",
        options: ["CIB", "CCB", "CB"],
        placeholder: "Submitter Line of Buisness",
        starVal: "*"
      },
      {
        attributeType: "_DateInput",
        name: "Date Submitted",
        placeholder: "Insert date here",
        starVal: "*"
      }
    ]
  }
};

export default SectionAttributeMap;
