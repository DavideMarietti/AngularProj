import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";

import {Recipe} from "../recipes/recipe.module";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('url_of_the_backend', recipes)
      .subscribe(res => {
        console.log(res)
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('url_of_the_backend')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            // To avoid nasty errors, the ingredient prop is always set at least to an empty array
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }

}
