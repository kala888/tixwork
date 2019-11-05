const FORM_DATA = {}

const GLOBAL_FORM_KEY = 'GLOBAL_FORM_KEY'

export function handleSubmit(payload = {}) {
  const { submit, values, formKey = GLOBAL_FORM_KEY } = payload
  console.log('get form data, payload', payload, FORM_DATA)
  if (submit) {
    const fields = FORM_DATA[formKey] || {}
    submit({ ...values, ...fields })
  }
}

export function handleSaveField(payload) {
  const { formKey = GLOBAL_FORM_KEY, name, value } = payload
  let formData = FORM_DATA[formKey]
  if (!formData) {
    formData = {}
    FORM_DATA[formKey] = formData
  }
  formData[name] = value
  console.log('save field, payload', payload, formData)
}

export function handleResetForm(payload) {
  const { formKey = GLOBAL_FORM_KEY } = payload
  FORM_DATA[formKey] = {}
}
