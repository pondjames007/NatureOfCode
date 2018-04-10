class Population{
    constructor(m, num){
        this.mutationRate = m;
        this.population = new Array(num);
        this.matingPool = [];
        this.generation = 0;

        for(let i = 0; i < this.population.length; i++){
            let position = createVector(random(width*0.3, width*0.7), random(height*0.3, height*0.7));
            this.population[i] = new Rocket(position, new DNA());
        }
    }

    live(bullets){
        for(let pop of this.population){
            pop.checkTarget(bullets);
            pop.run();
        }
    }

    calcFitness(elapseTime){
        for(let pop of this.population){
            pop.calcFitness(elapseTime);
        }
    }

    selection(){
        this.matingPool = [];

        let maxFitness = this.getMaxFitness();

        for(let pop of this.population){
            let fitnessNormal = map(pop.getFitness(), 0, maxFitness, 0, 1);
            let n = int(fitnessNormal * 100);
            //console.log(n);
            for(let i = 0; i < n; i++){
                this.matingPool.push(pop);
            }
        }
        //console.log(this.matingPool.length)
    }

    getMaxFitness(){
        let record = 0;
        for(let pop of this.population){
            if(pop.getFitness() > record){
                record = pop.getFitness();
            }
        }

        return record;
    }


    reproduction(){
        for(let i in this.population){
            let m = int(random(this.matingPool.length));
            let d = int(random(this.matingPool.length));

            let a = this.matingPool[m];
            let b = this.matingPool[d];

            let genesA = a.getDNA();
            let genesB = b.getDNA();

            let child = genesA.crossover(genesB);
            child.mutate(this.mutationRate);

            let position = createVector(random(width*0.3, width*0.7), random(height*0.3, height*0.7));
            this.population[i] = new Rocket(position, child);
        }

        this.generation++;
    }

    getGenerations(){
        return this.generation;
    }

    isFinished(){
        let finish = false;
        for(let i = 0; i < this.population.length; i++){
            if(this.population[i].hitBullet == true)
                finish = true;
            else{
                finish = false;
                break;
            }
        }

        return finish;
    }
}