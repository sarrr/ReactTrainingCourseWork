import {makeAutoObservable} from "mobx";
import {Activity} from '../app/models/activity';
import agent from '../app/api/agent';

export class ActivityStore {

    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
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

            activities.forEach(activity => {
              activity.date = activity.date.split('T')[0];
              this.activities.push(activity);
            })

            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.initialLoading = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
}

