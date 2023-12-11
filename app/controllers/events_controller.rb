class EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event, only: [:update, :destroy]
  before_action :authorize_user!, only: [:update, :destroy]

      def index
          status = params[:status]

          events = nil

          if status.present? and status == 'JOINED'
            events = current_user.joined_events
          elsif status.present? and status == 'NOT_JOINED'
            events = Event.where.not(id: current_user.joined_event_ids)
          else
            events = Event.all
          end
          render json: EventSerializer.new(events).serializable_hash
      end

      def index_from_owner
        events = Event.where(owner_id: current_user.id)
        render json: events
      end

      def create
        event = Event.create!(event_params)
        render json: event, status: :created
      end

      def destroy
        @event.destroy
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
        event =  Event.find(params[:id])
        render json: EventSerializer.new(event).serializable_hash
      end
    
      def update
        @event.update!(event_params)
        render json: @event
      end
    
      private
    
      def event_params
        params.require(:event).permit(:name, :description, :datetime, :location, :image).merge(owner_id: current_user.id)
      end

      def set_event
        @event = Event.find(params[:id])
      end
    
      def authorize_user!
        unless current_user == @event.owner
          render json: { error: "You are not authorized to perform this action." }, status: :unauthorized
        end
      end
end
