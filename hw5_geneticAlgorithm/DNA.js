class DNA{
    constructor(newgenes){

        if(newgenes){
            this.genes = newgenes;
        }
        else{
            this.genes = random(0, 0.1);
        }
    }

    crossover(partner){
        let child = 0;

        let crossover = random(1);

        if(crossover > 0.5)
            child = this.genes;
        else
            child = partner.genes;

        let newgenes = new DNA(child);
        return newgenes;
    }

    mutate(m){
        if(random(1) < m){
            this.genes = random(0, 0.1);
        }
    }
}