export function toPascalCase(str: string): string {
  return str
    .toLowerCase() // Converte a string para minúsculas
    .split('_') // Divide a string em um array onde há underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Converte a primeira letra de cada palavra para maiúscula
    .join(' '); // Junta as palavras com um espaço
}
