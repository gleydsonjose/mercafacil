export default async (url, method, data = null, useAuthorization = false) => {
  let authorization = ''

  if (useAuthorization) {
    const token = sessionStorage.getItem('token')
    authorization = token
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": authorization
  })

  const options = {
    method,
    headers
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)
  return await response.json()
}