import {makeAutoObservable} from "mobx";
import {Activity} from '../app/models/activity';
import agent from '../app/api/agent';

export class ActivityStore {

    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    initialLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {

        this.initialLoading = true;

        try {
            const activities = await agent.Activities.list();
        } catch (error) {
            
        }
    }
}

