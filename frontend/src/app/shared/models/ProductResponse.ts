export interface ProductResponse<T>  {
  data: T;
  minimumPrice?: number;
  maximumPrice?: number;
  minimumHorsepower?: number;
  maximumHorsepower?: number;
}
