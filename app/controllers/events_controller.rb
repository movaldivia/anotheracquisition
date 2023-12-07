class EventsController < ApplicationController
  before_action :authenticate_user!
    def index
        events = Event.all
        render json: events
      end

      def create
        event = Event.create!(event_params)
        render json: event, status: :created
      end

      def destroy
        Event.find(params[:id]).destroy
        head :no_content
      end

      def join
        event = Event.find(params[:id])
        current_user.joined_events << event
        render json: event, status: :created
      end

      def unjoin
        event = Event.find(params[:id])
        current_user.joined_events.destroy(event)
        head :no_content
      end

      def show
        render json: Event.find(params[:id])
      end
    
      def update
        event = Event.find(params[:id])
        event.update!(event_params)
        render json: event
      end
    
      private
    
      def event_params
        params.permit(:name, :description, :organizer, :location, :datetime, :id)
      end
end
