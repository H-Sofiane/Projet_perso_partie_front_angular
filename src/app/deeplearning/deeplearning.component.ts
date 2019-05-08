import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-deeplearning',
  templateUrl: './deeplearning.component.html',
  styleUrls: ['./deeplearning.component.css']
})
export class DeeplearningComponent implements OnInit {

	public tensors: tf.Tensor2D[]=[];

	/* Sequential => ensemble de couches de neuronnes
	 chaque couche va être utilisée comme entrée de la couche suivante. */
	public model:tf.Sequential;

	public learningRate:number = 0.001;

	public modelCreated: boolean;

  constructor() { }

  ngOnInit() {
  	//Création d'un tensor 2d   12 valeurs à spécifier    3 lignes et 4 colonnes  
  	this.tensors['X'] = tf.tensor2d([6,8,4,11,-2,78,-23,67,89,11,77,5],[3,4]);

  	 /*Création d'un autre tensor pour pouvoir faire un produit de matrice,
  	 donc le nb ligne de tensor y doit être égal au nb colonnes de tensor x
  	 donc il faut 4 lignes*/
  	this.tensors['Y'] = tf.tensor2d([[5,34,17],[4,10,17],[5,45,7],[15,1,-67]]);

  	this.tensors['X'].print();
  	this.tensors['Y'].print();
  }

  // Fonction permettant de faire le produit de 2 matrices
  onMult() {
  	this.tensors['Z'] = this.tensors['X'].matMul(this.tensors['Y']);
  }

  onTranspose() {
  	this.tensors['Z'] = this.tensors['X'].transpose();
  }

  onSigmoid() {
  	this.tensors['Z'] = tf.sigmoid(this.tensors['X']);
  }

  onRELU() {
  	this.tensors['Z'] = tf.relu(this.tensors['X']);
  }

  onCreateModel() {
  	this.model = tf.sequential();
  	/* dense => couche de neurones dans laquelle,
  	 la sortie de chaque neurone devient entrée de tout les neurones de la couche suivante 
  	 (fully connected)*/
  	this.model.add(tf.layers.dense({

  		/* inputShape => Pour spécifier le nombre d'entrées
  		de la couche précédente dans la 1ère couche qu'on va créer.
  		nb entrée = nb de colonne dans la matrice => pas encore sur*/
  		units:10, inputShape:[4], activation:'sigmoid'
  	}));
  	this.model.add(tf.layers.dense({
  		/* softmx => calcul de la probabilité */
  		units:3, activation:'softmax'
  	}));

  	this.model.compile({
  		/* algorithmes de rétropropagation du gradient (ou algorithmes de descente du gradient)
  		pour calculer le gradient de l'erreur pour chaque neurone d'un réseau de neurones (pour minimiser l'erreur) */
  		/* algorithme d'optimisation adam */
  		/* learningRate => vitesse d'apprentissage -> nb entre 0 et 1 
  		mais il ne faut pas que se soit 1 car risque de ne jamais trouver le minimum
  		en majorité la valeur est environ de 0.001*/
  		/* Il faut spécifier la fonction d'optimisation (choisir l'algo de rétropropagation du gradient) */
  		optimizer:tf.train.adam(this.learningRate),
  		/* loss => erreur à minimiser, meanSquaredError => moyenne quadratique */
  		loss:tf.losses.meanSquaredError,
  		/* Mesure de la précision */
  		metrics:['accuracy']
  	});

  	


  	this.modelCreated = true;
  }

}
