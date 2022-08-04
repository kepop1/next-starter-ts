// This shuts up TypeScript when you import a CSS module.
declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}
