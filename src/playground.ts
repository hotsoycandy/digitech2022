const googleHtmlPromise: Promise<string> = new Promise((resolve, reject) => {
  fetch('google')
    .then((res) => resolve(res.text()))
    .catch(reject)
})

async function sub (): Promise<any> {
  console.log('sub start')
  await googleHtmlPromise
  console.log('sub end')
}

async function main (): Promise<any> {
  console.log('main start')
  await sub().catch(console.error)
  console.log('main end')
}

main().catch(console.error)
